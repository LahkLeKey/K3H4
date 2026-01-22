import { type PrismaClient } from "@prisma/client";
import { type FastifyInstance, type FastifyReply } from "fastify";
import { fetchAndCache } from "../services/usda-cache";
import { fetchWikidataWithCache } from "../services/wikidata-cache";
import { type RecordTelemetryFn } from "./types";

const DEFAULT_MAX_AGE_MINUTES = 60;

const badRequest = (reply: FastifyReply, message: string) => reply.status(400).send({ error: message });

const toInt = (value: unknown) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0 && Number.isFinite(Number(value))) return Number(value);
  return null;
};

const toStringParam = (value: unknown) => {
  if (typeof value === "string" && value.trim().length > 0) return value.trim();
  if (typeof value === "number") return String(value);
  return null;
};

export function registerUsdaRoutes(server: FastifyInstance, prisma: PrismaClient, recordTelemetry: RecordTelemetryFn) {
  const auth = { preHandler: [server.authenticate] };

  const enrichReference = async (
    kind: "region" | "country" | "commodity" | "unit" | "attribute",
    dataset: "esr" | "gats" | "psd",
    items: any,
  ) => {
    if (!Array.isArray(items)) return items;
    const repo =
      kind === "region"
        ? prisma.usdaRegion
        : kind === "country"
          ? prisma.usdaCountry
          : kind === "commodity"
            ? prisma.usdaCommodity
            : kind === "unit"
              ? prisma.usdaUnit
              : prisma.usdaCommodityAttribute;

    const normalize = (item: any) => {
      const code =
        item.code ??
        item.regionCode ??
        item.countryCode ??
        item.commodityCode ??
        item.unitCode ??
        item.attributeCode ??
        item.Code ??
        item.codeId ??
        null;
      const name =
        item.name ??
        item.regionName ??
        item.countryName ??
        item.commodityName ??
        item.unitName ??
        item.attributeName ??
        item.description ??
        item.Name ??
        null;
      return { code: code ? String(code) : null, name: name ? String(name) : null };
    };

    const enriched = [] as any[];
    for (const row of items) {
      const { code, name } = normalize(row);
      if (!code || !name) {
        enriched.push(row);
        continue;
      }

      let record = await repo.upsert({
        where: { dataset_code: { dataset, code } },
        create: { dataset, code, name },
        update: { name },
      });

      if (!record.wikidataId && name) {
        try {
          const query = code ? `${name} ${code}` : name;
          const search = await fetchWikidataWithCache(prisma, "/wikidata/search/items", { q: query, limit: 1 }, {
            resource: "usda-wikidata",
            maxAgeMinutes: 24 * 60,
          });
          const payload = search.payload as any;
          const hit = payload?.search?.[0] ?? payload?.items?.[0];
          if (hit?.id) {
            const propertyWhitelist: Record<typeof kind, string[]> = {
              region: ["P17", "P1082"],
              country: ["P17", "P36", "P1082"],
              commodity: ["P495", "P279"],
              unit: ["P558", "P1686"],
              attribute: ["P279", "P31"],
            } as const;

            let statements: any = null;
            const props = propertyWhitelist[kind];
            if (props && props.length > 0) {
              try {
                const stmt = await fetchWikidataWithCache(prisma, `/wikidata/items/${hit.id}/statements`, undefined, {
                  resource: "usda-wikidata-statements",
                  maxAgeMinutes: 24 * 60,
                });
                const payloadStmt: any = stmt.payload;
                const filtered: Record<string, any> = {};
                props.forEach((p) => {
                  const val = payloadStmt?.statements?.[p] ?? payloadStmt?.[p];
                  if (val) filtered[p] = val;
                });
                statements = filtered;
              } catch (err) {
                server.log.warn({ err, kind, code, name, hitId: hit.id }, "wikidata statements fetch failed");
              }
            }

            record = await repo.update({
              where: { dataset_code: { dataset, code } },
              data: { wikidataId: hit.id as string, enrichment: { hit, statements: statements ?? undefined } },
            });
          }
        } catch (err) {
          // best-effort enrichment; ignore failures
          server.log.warn({ err, kind, code, name }, "wikidata enrichment failed");
        }
      }

      enriched.push({ ...row, wikidataId: record.wikidataId ?? null, enrichment: record.enrichment ?? null });
    }
    server.log.info({ kind, dataset, total: items.length, enriched: enriched.filter((e) => e.wikidataId).length }, "usda enrichment");
    return enriched;
  };

  // ESR reference endpoints
  server.get("/usda/esr/regions", auth, async (request) => {
    const payload = await fetchAndCache(prisma, "esr", "/api/esr/regions", undefined, { maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES });
    const enriched = await enrichReference("region", "esr", payload);
    await recordTelemetry(request, { eventType: "usda.esr.regions.fetch", source: "api" });
    return enriched;
  });

  server.get("/usda/esr/countries", auth, async (request) => {
    const payload = await fetchAndCache(prisma, "esr", "/api/esr/countries", undefined, { maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES });
    const enriched = await enrichReference("country", "esr", payload);
    await recordTelemetry(request, { eventType: "usda.esr.countries.fetch", source: "api" });
    return enriched;
  });

  server.get("/usda/esr/commodities", auth, async (request) => {
    const payload = await fetchAndCache(prisma, "esr", "/api/esr/commodities", undefined, { maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES });
    const enriched = await enrichReference("commodity", "esr", payload);
    await recordTelemetry(request, { eventType: "usda.esr.commodities.fetch", source: "api" });
    return enriched;
  });

  server.get("/usda/esr/units", auth, async (request) => {
    const payload = await fetchAndCache(prisma, "esr", "/api/esr/unitsOfMeasure", undefined, { maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES });
    await recordTelemetry(request, { eventType: "usda.esr.units.fetch", source: "api" });
    return payload;
  });

  server.get("/usda/esr/data-release", auth, async (request) => {
    const payload = await fetchAndCache(prisma, "esr", "/api/esr/datareleasedates", undefined, { maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES });
    await recordTelemetry(request, { eventType: "usda.esr.dataRelease.fetch", source: "api" });
    return payload;
  });

  server.get("/usda/esr/exports/all-countries", auth, async (request, reply) => {
    const { commodityCode, marketYear } = request.query as { commodityCode?: string; marketYear?: string };
    const commodity = toInt(commodityCode);
    const year = toInt(marketYear);
    if (commodity === null || year === null) return badRequest(reply, "commodityCode and marketYear are required numbers");
    const path = `/api/esr/exports/commodityCode/${encodeURIComponent(String(commodity))}/allCountries/marketYear/${encodeURIComponent(String(year))}`;
    const payload = await fetchAndCache(prisma, "esr", path, undefined, { maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES });
    await recordTelemetry(request, { eventType: "usda.esr.exports.allCountries.fetch", source: "api", payload: { commodity, year } });
    return payload;
  });

  server.get("/usda/esr/exports/by-country", auth, async (request, reply) => {
    const { commodityCode, countryCode, marketYear } = request.query as { commodityCode?: string; countryCode?: string; marketYear?: string };
    const commodity = toInt(commodityCode);
    const country = toInt(countryCode);
    const year = toInt(marketYear);
    if (commodity === null || country === null || year === null) return badRequest(reply, "commodityCode, countryCode, and marketYear are required numbers");
    const path = `/api/esr/exports/commodityCode/${encodeURIComponent(String(commodity))}/countryCode/${encodeURIComponent(String(country))}/marketYear/${encodeURIComponent(String(year))}`;
    const payload = await fetchAndCache(prisma, "esr", path, undefined, { maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES });
    await recordTelemetry(request, { eventType: "usda.esr.exports.byCountry.fetch", source: "api", payload: { commodity, country, year } });
    return payload;
  });

  // GATS release endpoints
  server.get("/usda/gats/census/exports/data-release", auth, async (request) => {
    const payload = await fetchAndCache(prisma, "gats", "/api/gats/census/data/exports/dataReleaseDates", undefined, { maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES });
    await recordTelemetry(request, { eventType: "usda.gats.census.exports.release.fetch", source: "api" });
    return payload;
  });

  server.get("/usda/gats/census/imports/data-release", auth, async (request) => {
    const payload = await fetchAndCache(prisma, "gats", "/api/gats/census/data/imports/dataReleaseDates", undefined, { maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES });
    await recordTelemetry(request, { eventType: "usda.gats.census.imports.release.fetch", source: "api" });
    return payload;
  });

  server.get("/usda/gats/un/exports/data-release", auth, async (request) => {
    const payload = await fetchAndCache(prisma, "gats", "/api/gats/UNTrade/data/exports/dataReleaseDates", undefined, { maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES });
    await recordTelemetry(request, { eventType: "usda.gats.un.exports.release.fetch", source: "api" });
    return payload;
  });

  server.get("/usda/gats/un/imports/data-release", auth, async (request) => {
    const payload = await fetchAndCache(prisma, "gats", "/api/gats/UNTrade/data/imports/dataReleaseDates", undefined, { maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES });
    await recordTelemetry(request, { eventType: "usda.gats.un.imports.release.fetch", source: "api" });
    return payload;
  });

  // GATS reference endpoints
  server.get("/usda/gats/regions", auth, async (request) => {
    const payload = await fetchAndCache(prisma, "gats", "/api/gats/regions", undefined, { maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES });
    const enriched = await enrichReference("region", "gats", payload);
    await recordTelemetry(request, { eventType: "usda.gats.regions.fetch", source: "api" });
    return enriched;
  });

  server.get("/usda/gats/countries", auth, async (request) => {
    const payload = await fetchAndCache(prisma, "gats", "/api/gats/countries", undefined, { maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES });
    const enriched = await enrichReference("country", "gats", payload);
    await recordTelemetry(request, { eventType: "usda.gats.countries.fetch", source: "api" });
    return enriched;
  });

  server.get("/usda/gats/commodities", auth, async (request) => {
    const payload = await fetchAndCache(prisma, "gats", "/api/gats/commodities", undefined, { maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES });
    const enriched = await enrichReference("commodity", "gats", payload);
    await recordTelemetry(request, { eventType: "usda.gats.commodities.fetch", source: "api" });
    return enriched;
  });

  server.get("/usda/gats/hs6-commodities", auth, async (request) => {
    const payload = await fetchAndCache(prisma, "gats", "/api/gats/HS6Commodities", undefined, { maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES });
    const enriched = await enrichReference("commodity", "gats", payload);
    await recordTelemetry(request, { eventType: "usda.gats.hs6.fetch", source: "api" });
    return enriched;
  });

  server.get("/usda/gats/units", auth, async (request) => {
    const payload = await fetchAndCache(prisma, "gats", "/api/gats/unitsOfMeasure", undefined, { maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES });
    await recordTelemetry(request, { eventType: "usda.gats.units.fetch", source: "api" });
    return payload;
  });

  server.get("/usda/gats/customs-districts", auth, async (request) => {
    const payload = await fetchAndCache(prisma, "gats", "/api/gats/customsDistricts", undefined, { maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES });
    await recordTelemetry(request, { eventType: "usda.gats.customsDistricts.fetch", source: "api" });
    return payload;
  });

  // GATS census flows
  server.get("/usda/gats/census/imports", auth, async (request, reply) => {
    const { partnerCode, year, month } = request.query as { partnerCode?: string; year?: string; month?: string };
    const partner = toStringParam(partnerCode);
    const y = toInt(year);
    const m = toInt(month);
    if (!partner || y === null || m === null) return badRequest(reply, "partnerCode, year, and month are required");
    const path = `/api/gats/censusImports/partnerCode/${encodeURIComponent(partner)}/year/${encodeURIComponent(String(y))}/month/${encodeURIComponent(String(m))}`;
    const payload = await fetchAndCache(prisma, "gats", path, undefined, { maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES });
    await recordTelemetry(request, { eventType: "usda.gats.census.imports.fetch", source: "api", payload: { partner, y, m } });
    return payload;
  });

  server.get("/usda/gats/census/exports", auth, async (request, reply) => {
    const { partnerCode, year, month } = request.query as { partnerCode?: string; year?: string; month?: string };
    const partner = toStringParam(partnerCode);
    const y = toInt(year);
    const m = toInt(month);
    if (!partner || y === null || m === null) return badRequest(reply, "partnerCode, year, and month are required");
    const path = `/api/gats/censusExports/partnerCode/${encodeURIComponent(partner)}/year/${encodeURIComponent(String(y))}/month/${encodeURIComponent(String(m))}`;
    const payload = await fetchAndCache(prisma, "gats", path, undefined, { maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES });
    await recordTelemetry(request, { eventType: "usda.gats.census.exports.fetch", source: "api", payload: { partner, y, m } });
    return payload;
  });

  server.get("/usda/gats/census/reexports", auth, async (request, reply) => {
    const { partnerCode, year, month } = request.query as { partnerCode?: string; year?: string; month?: string };
    const partner = toStringParam(partnerCode);
    const y = toInt(year);
    const m = toInt(month);
    if (!partner || y === null || m === null) return badRequest(reply, "partnerCode, year, and month are required");
    const path = `/api/gats/censusReExports/partnerCode/${encodeURIComponent(partner)}/year/${encodeURIComponent(String(y))}/month/${encodeURIComponent(String(m))}`;
    const payload = await fetchAndCache(prisma, "gats", path, undefined, { maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES });
    await recordTelemetry(request, { eventType: "usda.gats.census.reexports.fetch", source: "api", payload: { partner, y, m } });
    return payload;
  });

  // GATS customs district flows
  server.get("/usda/gats/customs/imports", auth, async (request, reply) => {
    const { partnerCode, year, month } = request.query as { partnerCode?: string; year?: string; month?: string };
    const partner = toStringParam(partnerCode);
    const y = toInt(year);
    const m = toInt(month);
    if (!partner || y === null || m === null) return badRequest(reply, "partnerCode, year, and month are required");
    const path = `/api/gats/customsDistrictImports/partnerCode/${encodeURIComponent(partner)}/year/${encodeURIComponent(String(y))}/month/${encodeURIComponent(String(m))}`;
    const payload = await fetchAndCache(prisma, "gats", path, undefined, { maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES });
    await recordTelemetry(request, { eventType: "usda.gats.customs.imports.fetch", source: "api", payload: { partner, y, m } });
    return payload;
  });

  server.get("/usda/gats/customs/exports", auth, async (request, reply) => {
    const { partnerCode, year, month } = request.query as { partnerCode?: string; year?: string; month?: string };
    const partner = toStringParam(partnerCode);
    const y = toInt(year);
    const m = toInt(month);
    if (!partner || y === null || m === null) return badRequest(reply, "partnerCode, year, and month are required");
    const path = `/api/gats/customsDistrictExports/partnerCode/${encodeURIComponent(partner)}/year/${encodeURIComponent(String(y))}/month/${encodeURIComponent(String(m))}`;
    const payload = await fetchAndCache(prisma, "gats", path, undefined, { maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES });
    await recordTelemetry(request, { eventType: "usda.gats.customs.exports.fetch", source: "api", payload: { partner, y, m } });
    return payload;
  });

  server.get("/usda/gats/customs/reexports", auth, async (request, reply) => {
    const { partnerCode, year, month } = request.query as { partnerCode?: string; year?: string; month?: string };
    const partner = toStringParam(partnerCode);
    const y = toInt(year);
    const m = toInt(month);
    if (!partner || y === null || m === null) return badRequest(reply, "partnerCode, year, and month are required");
    const path = `/api/gats/customsDistrictReExports/partnerCode/${encodeURIComponent(partner)}/year/${encodeURIComponent(String(y))}/month/${encodeURIComponent(String(m))}`;
    const payload = await fetchAndCache(prisma, "gats", path, undefined, { maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES });
    await recordTelemetry(request, { eventType: "usda.gats.customs.reexports.fetch", source: "api", payload: { partner, y, m } });
    return payload;
  });

  // GATS UN trade flows
  server.get("/usda/gats/un/imports", auth, async (request, reply) => {
    const { reporterCode, year } = request.query as { reporterCode?: string; year?: string };
    const reporter = toStringParam(reporterCode);
    const y = toStringParam(year);
    if (!reporter || !y) return badRequest(reply, "reporterCode and year are required");
    const path = `/api/gats/UNTradeImports/reporterCode/${encodeURIComponent(reporter)}/year/${encodeURIComponent(y)}`;
    const payload = await fetchAndCache(prisma, "gats", path, undefined, { maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES });
    await recordTelemetry(request, { eventType: "usda.gats.un.imports.fetch", source: "api", payload: { reporter, y } });
    return payload;
  });

  server.get("/usda/gats/un/exports", auth, async (request, reply) => {
    const { reporterCode, year } = request.query as { reporterCode?: string; year?: string };
    const reporter = toStringParam(reporterCode);
    const y = toStringParam(year);
    if (!reporter || !y) return badRequest(reply, "reporterCode and year are required");
    const path = `/api/gats/UNTradeExports/reporterCode/${encodeURIComponent(reporter)}/year/${encodeURIComponent(y)}`;
    const payload = await fetchAndCache(prisma, "gats", path, undefined, { maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES });
    await recordTelemetry(request, { eventType: "usda.gats.un.exports.fetch", source: "api", payload: { reporter, y } });
    return payload;
  });

  server.get("/usda/gats/un/reexports", auth, async (request, reply) => {
    const { reporterCode, year } = request.query as { reporterCode?: string; year?: string };
    const reporter = toStringParam(reporterCode);
    const y = toStringParam(year);
    if (!reporter || !y) return badRequest(reply, "reporterCode and year are required");
    const path = `/api/gats/UNTradeReExports/reporterCode/${encodeURIComponent(reporter)}/year/${encodeURIComponent(y)}`;
    const payload = await fetchAndCache(prisma, "gats", path, undefined, { maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES });
    await recordTelemetry(request, { eventType: "usda.gats.un.reexports.fetch", source: "api", payload: { reporter, y } });
    return payload;
  });

  // PSD endpoints
  server.get("/usda/psd/commodity/data-release", auth, async (request, reply) => {
    const { commodityCode } = request.query as { commodityCode?: string };
    const commodity = toStringParam(commodityCode);
    if (!commodity) return badRequest(reply, "commodityCode is required");
    const path = `/api/psd/commodity/${encodeURIComponent(commodity)}/dataReleaseDates`;
    const payload = await fetchAndCache(prisma, "psd", path, undefined, { maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES });
    await recordTelemetry(request, { eventType: "usda.psd.release.fetch", source: "api", payload: { commodity } });
    return payload;
  });

  server.get("/usda/psd/regions", auth, async (request) => {
    const payload = await fetchAndCache(prisma, "psd", "/api/psd/regions", undefined, { maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES });
    const enriched = await enrichReference("region", "psd", payload);
    await recordTelemetry(request, { eventType: "usda.psd.regions.fetch", source: "api" });
    return enriched;
  });

  server.get("/usda/psd/countries", auth, async (request) => {
    const payload = await fetchAndCache(prisma, "psd", "/api/psd/countries", undefined, { maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES });
    const enriched = await enrichReference("country", "psd", payload);
    await recordTelemetry(request, { eventType: "usda.psd.countries.fetch", source: "api" });
    return enriched;
  });

  server.get("/usda/psd/commodities", auth, async (request) => {
    const payload = await fetchAndCache(prisma, "psd", "/api/psd/commodities", undefined, { maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES });
    const enriched = await enrichReference("commodity", "psd", payload);
    await recordTelemetry(request, { eventType: "usda.psd.commodities.fetch", source: "api" });
    return enriched;
  });

  server.get("/usda/psd/units", auth, async (request) => {
    const payload = await fetchAndCache(prisma, "psd", "/api/psd/unitsOfMeasure", undefined, { maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES });
    const enriched = await enrichReference("unit", "psd", payload);
    await recordTelemetry(request, { eventType: "usda.psd.units.fetch", source: "api" });
    return enriched;
  });

  server.get("/usda/psd/commodity-attributes", auth, async (request) => {
    const payload = await fetchAndCache(prisma, "psd", "/api/psd/commodityAttributes", undefined, { maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES });
    const enriched = await enrichReference("attribute", "psd", payload);
    await recordTelemetry(request, { eventType: "usda.psd.attributes.fetch", source: "api" });
    return enriched;
  });

  server.get("/usda/psd/commodity/all-countries", auth, async (request, reply) => {
    const { commodityCode, marketYear } = request.query as { commodityCode?: string; marketYear?: string };
    const commodity = toStringParam(commodityCode);
    const year = toInt(marketYear);
    if (!commodity || year === null) return badRequest(reply, "commodityCode and marketYear are required");
    const path = `/api/psd/commodity/${encodeURIComponent(commodity)}/country/all/year/${encodeURIComponent(String(year))}`;
    const payload = await fetchAndCache(prisma, "psd", path, undefined, { maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES });
    await recordTelemetry(request, { eventType: "usda.psd.commodity.allCountries.fetch", source: "api", payload: { commodity, year } });
    return payload;
  });

  server.get("/usda/psd/commodity/by-country", auth, async (request, reply) => {
    const { commodityCode, countryCode, marketYear } = request.query as { commodityCode?: string; countryCode?: string; marketYear?: string };
    const commodity = toStringParam(commodityCode);
    const country = toStringParam(countryCode);
    const year = toInt(marketYear);
    if (!commodity || !country || year === null) return badRequest(reply, "commodityCode, countryCode, and marketYear are required");
    const path = `/api/psd/commodity/${encodeURIComponent(commodity)}/country/${encodeURIComponent(country)}/year/${encodeURIComponent(String(year))}`;
    const payload = await fetchAndCache(prisma, "psd", path, undefined, { maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES });
    await recordTelemetry(request, { eventType: "usda.psd.commodity.country.fetch", source: "api", payload: { commodity, country, year } });
    return payload;
  });

  server.get("/usda/psd/commodity/world", auth, async (request, reply) => {
    const { commodityCode, marketYear } = request.query as { commodityCode?: string; marketYear?: string };
    const commodity = toStringParam(commodityCode);
    const year = toInt(marketYear);
    if (!commodity || year === null) return badRequest(reply, "commodityCode and marketYear are required");
    const path = `/api/psd/commodity/${encodeURIComponent(commodity)}/world/year/${encodeURIComponent(String(year))}`;
    const payload = await fetchAndCache(prisma, "psd", path, undefined, { maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES });
    await recordTelemetry(request, { eventType: "usda.psd.commodity.world.fetch", source: "api", payload: { commodity, year } });
    return payload;
  });
}
