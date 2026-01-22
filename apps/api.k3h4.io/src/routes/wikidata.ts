import { type PrismaClient } from "@prisma/client";
import { type FastifyInstance, type FastifyReply } from "fastify";
import { fetchWikidataWithCache } from "../services/wikidata-cache";
import { buildTelemetryBase } from "./telemetry";
import { type RecordTelemetryFn } from "./types";

const DEFAULT_ENTITY_MAX_AGE_MINUTES = 360; // Wikidata entities change, but we can reuse results for a few hours
const DEFAULT_SEARCH_MAX_AGE_MINUTES = 120;

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

const cleanParams = (query: Record<string, unknown>) => {
  const params: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) continue;
    if (typeof value === "boolean") {
      params[key] = value;
      continue;
    }
    if (typeof value === "number" && Number.isFinite(value)) {
      params[key] = value;
      continue;
    }
    if (typeof value === "string" && value.trim().length > 0) {
      params[key] = value.trim();
    }
  }
  return params;
};

export function registerWikidataRoutes(server: FastifyInstance, prisma: PrismaClient, recordTelemetry: RecordTelemetryFn) {
  const auth = { preHandler: [server.authenticate] };

  server.get("/wikidata/items/:itemId", auth, async (request, reply) => {
    const { itemId } = request.params as { itemId?: string };
    if (!itemId) return badRequest(reply, "itemId is required");

    const { maxAgeMinutes, ...rawQuery } = request.query as Record<string, unknown>;
    const maxAge = toInt(maxAgeMinutes) ?? DEFAULT_ENTITY_MAX_AGE_MINUTES;
    const params = cleanParams(rawQuery);
    const endpoint = `/wikibase/v1/entities/items/${encodeURIComponent(itemId)}`;

    const result = await fetchWikidataWithCache(prisma, endpoint, params, { resource: "item", maxAgeMinutes: maxAge });
    await recordTelemetry(request, {
      ...buildTelemetryBase(request),
      eventType: "wikidata.item.fetch",
      source: "api",
      payload: { itemId, cached: result.cached, status: result.status },
    });

    return reply.status(result.status).send(result.payload);
  });

  server.get("/wikidata/properties/:propertyId", auth, async (request, reply) => {
    const { propertyId } = request.params as { propertyId?: string };
    if (!propertyId) return badRequest(reply, "propertyId is required");

    const { maxAgeMinutes, ...rawQuery } = request.query as Record<string, unknown>;
    const maxAge = toInt(maxAgeMinutes) ?? DEFAULT_ENTITY_MAX_AGE_MINUTES;
    const params = cleanParams(rawQuery);
    const endpoint = `/wikibase/v1/entities/properties/${encodeURIComponent(propertyId)}`;

    const result = await fetchWikidataWithCache(prisma, endpoint, params, { resource: "property", maxAgeMinutes: maxAge });
    await recordTelemetry(request, {
      ...buildTelemetryBase(request),
      eventType: "wikidata.property.fetch",
      source: "api",
      payload: { propertyId, cached: result.cached, status: result.status },
    });

    return reply.status(result.status).send(result.payload);
  });

  server.get("/wikidata/items/:itemId/statements", auth, async (request, reply) => {
    const { itemId } = request.params as { itemId?: string };
    if (!itemId) return badRequest(reply, "itemId is required");

    const { maxAgeMinutes, ...rawQuery } = request.query as Record<string, unknown>;
    const maxAge = toInt(maxAgeMinutes) ?? DEFAULT_ENTITY_MAX_AGE_MINUTES;
    const params = cleanParams(rawQuery);
    const endpoint = `/wikibase/v1/entities/items/${encodeURIComponent(itemId)}/statements`;

    const result = await fetchWikidataWithCache(prisma, endpoint, params, { resource: "item-statements", maxAgeMinutes: maxAge });
    await recordTelemetry(request, {
      ...buildTelemetryBase(request),
      eventType: "wikidata.item.statements.fetch",
      source: "api",
      payload: { itemId, cached: result.cached, status: result.status },
    });

    return reply.status(result.status).send(result.payload);
  });

  server.get("/wikidata/items/:itemId/labels", auth, async (request, reply) => {
    const { itemId } = request.params as { itemId?: string };
    if (!itemId) return badRequest(reply, "itemId is required");

    const { maxAgeMinutes, ...rawQuery } = request.query as Record<string, unknown>;
    const maxAge = toInt(maxAgeMinutes) ?? DEFAULT_ENTITY_MAX_AGE_MINUTES;
    const params = cleanParams(rawQuery);
    const endpoint = `/wikibase/v1/entities/items/${encodeURIComponent(itemId)}/labels`;

    const result = await fetchWikidataWithCache(prisma, endpoint, params, { resource: "item-labels", maxAgeMinutes: maxAge });
    await recordTelemetry(request, {
      ...buildTelemetryBase(request),
      eventType: "wikidata.item.labels.fetch",
      source: "api",
      payload: { itemId, cached: result.cached, status: result.status },
    });

    return reply.status(result.status).send(result.payload);
  });

  server.get("/wikidata/items/:itemId/labels/:languageCode", auth, async (request, reply) => {
    const { itemId, languageCode } = request.params as { itemId?: string; languageCode?: string };
    if (!itemId || !languageCode) return badRequest(reply, "itemId and languageCode are required");

    const { maxAgeMinutes, ...rawQuery } = request.query as Record<string, unknown>;
    const maxAge = toInt(maxAgeMinutes) ?? DEFAULT_ENTITY_MAX_AGE_MINUTES;
    const params = cleanParams(rawQuery);
    const endpoint = `/wikibase/v1/entities/items/${encodeURIComponent(itemId)}/labels/${encodeURIComponent(languageCode)}`;

    const result = await fetchWikidataWithCache(prisma, endpoint, params, {
      resource: "item-label",
      maxAgeMinutes: maxAge,
    });

    await recordTelemetry(request, {
      ...buildTelemetryBase(request),
      eventType: "wikidata.item.label.fetch",
      source: "api",
      payload: { itemId, languageCode, cached: result.cached, status: result.status },
    });

    return reply.status(result.status).send(result.payload);
  });

  server.get("/wikidata/items/:itemId/sitelinks", auth, async (request, reply) => {
    const { itemId } = request.params as { itemId?: string };
    if (!itemId) return badRequest(reply, "itemId is required");

    const { maxAgeMinutes, ...rawQuery } = request.query as Record<string, unknown>;
    const maxAge = toInt(maxAgeMinutes) ?? DEFAULT_ENTITY_MAX_AGE_MINUTES;
    const params = cleanParams(rawQuery);
    const endpoint = `/wikibase/v1/entities/items/${encodeURIComponent(itemId)}/sitelinks`;

    const result = await fetchWikidataWithCache(prisma, endpoint, params, {
      resource: "item-sitelinks",
      maxAgeMinutes: maxAge,
    });

    await recordTelemetry(request, {
      ...buildTelemetryBase(request),
      eventType: "wikidata.item.sitelinks.fetch",
      source: "api",
      payload: { itemId, cached: result.cached, status: result.status },
    });

    return reply.status(result.status).send(result.payload);
  });

  server.get("/wikidata/items/:itemId/sitelinks/:siteId", auth, async (request, reply) => {
    const { itemId, siteId } = request.params as { itemId?: string; siteId?: string };
    if (!itemId || !siteId) return badRequest(reply, "itemId and siteId are required");

    const { maxAgeMinutes, ...rawQuery } = request.query as Record<string, unknown>;
    const maxAge = toInt(maxAgeMinutes) ?? DEFAULT_ENTITY_MAX_AGE_MINUTES;
    const params = cleanParams(rawQuery);
    const endpoint = `/wikibase/v1/entities/items/${encodeURIComponent(itemId)}/sitelinks/${encodeURIComponent(siteId)}`;

    const result = await fetchWikidataWithCache(prisma, endpoint, params, {
      resource: "item-sitelink",
      maxAgeMinutes: maxAge,
    });

    await recordTelemetry(request, {
      ...buildTelemetryBase(request),
      eventType: "wikidata.item.sitelink.fetch",
      source: "api",
      payload: { itemId, siteId, cached: result.cached, status: result.status },
    });

    return reply.status(result.status).send(result.payload);
  });

  server.get("/wikidata/search/items", auth, async (request, reply) => {
    const { q, language, limit, continue: continuation, maxAgeMinutes } = request.query as {
      q?: string;
      language?: string;
      limit?: string;
      continue?: string;
      maxAgeMinutes?: string;
    };

    const query = toStringParam(q);
    if (!query) return badRequest(reply, "q is required");

    const params = cleanParams({ q: query, language, limit: toInt(limit) ?? undefined, continue: continuation });
    const maxAge = toInt(maxAgeMinutes) ?? DEFAULT_SEARCH_MAX_AGE_MINUTES;

    const result = await fetchWikidataWithCache(prisma, "/wikibase/v0/search/items", params, {
      resource: "search-items",
      maxAgeMinutes: maxAge,
    });

    await recordTelemetry(request, {
      ...buildTelemetryBase(request),
      eventType: "wikidata.search.items",
      source: "api",
      payload: { q: query, cached: result.cached, status: result.status },
    });

    return reply.status(result.status).send(result.payload);
  });

  server.get("/wikidata/search/properties", auth, async (request, reply) => {
    const { q, language, limit, continue: continuation, maxAgeMinutes } = request.query as {
      q?: string;
      language?: string;
      limit?: string;
      continue?: string;
      maxAgeMinutes?: string;
    };

    const query = toStringParam(q);
    if (!query) return badRequest(reply, "q is required");

    const params = cleanParams({ q: query, language, limit: toInt(limit) ?? undefined, continue: continuation });
    const maxAge = toInt(maxAgeMinutes) ?? DEFAULT_SEARCH_MAX_AGE_MINUTES;

    const result = await fetchWikidataWithCache(prisma, "/wikibase/v0/search/properties", params, {
      resource: "search-properties",
      maxAgeMinutes: maxAge,
    });

    await recordTelemetry(request, {
      ...buildTelemetryBase(request),
      eventType: "wikidata.search.properties",
      source: "api",
      payload: { q: query, cached: result.cached, status: result.status },
    });

    return reply.status(result.status).send(result.payload);
  });
}
