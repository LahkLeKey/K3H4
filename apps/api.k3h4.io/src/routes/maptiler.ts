import { PrismaClient } from "@prisma/client";
import { type FastifyInstance, type FastifyReply, type FastifyRequest } from "fastify";
import { fetchMaptilerWithCache } from "../services/maptiler-cache";
import { type RecordTelemetryFn } from "./types";

const DEFAULT_MAX_AGE_MINUTES = 60 * 6; // 6 hours
const MAPTILER_RATE_LIMIT_MAX = Number(process.env.MAPTILER_RATE_LIMIT_MAX ?? 60);
const MAPTILER_RATE_LIMIT_WINDOW = process.env.MAPTILER_RATE_LIMIT_WINDOW || "1 minute";
const allowedRoots = new Set([
  "geocoding",
  "search",
  "maps",
  "tiles",
  "vector-tiles",
  "data",
  "styles",
  "fonts",
  "elevation",
  "weather",
  "matrix",
  "geolocation",
  "place",
  "static",
]);

const badRequest = (reply: FastifyReply, message: string) => reply.status(400).send({ error: message });

const coerceNumber = (value: unknown) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0 && Number.isFinite(Number(value))) return Number(value);
  return null;
};

const normalizePath = (rawPath: string) => {
  const trimmed = rawPath.trim();
  if (trimmed.length === 0) throw new Error("path is required");
  if (trimmed.includes("://")) throw new Error("path must be relative (no protocol)");
  const path = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  const first = path.split("/").filter(Boolean)[0];
  if (!first || !allowedRoots.has(first)) throw new Error("path root is not allowed");
  return path;
};

const pickParams = (query: Record<string, any>) => {
  const { path, maxAgeMinutes, responseType, ...rest } = query;
  return rest;
};

const parseMaxAge = (query: Record<string, any>) => coerceNumber(query.maxAgeMinutes ?? DEFAULT_MAX_AGE_MINUTES) ?? DEFAULT_MAX_AGE_MINUTES;

export function registerMaptilerRoutes(server: FastifyInstance, prisma: PrismaClient, recordTelemetry: RecordTelemetryFn) {
  // Map views should work even for anonymous users; we only verify JWT if present.
  const optionalAuth = {
    preHandler: [async (request: FastifyRequest) => {
      try {
        await request.jwtVerify();
      } catch {
        // ignore missing/invalid tokens
      }
    }],
  };

  const handler = async (responseType: "json" | "arrayBuffer", request: FastifyRequest, reply: FastifyReply) => {
    const query = request.query as Record<string, any>;
    const rawPath = typeof query.path === "string" ? query.path : "";

    let path: string;
    try {
      path = normalizePath(rawPath);
    } catch (err) {
      return badRequest(reply, (err as Error).message);
    }

    const userId = (request.user as { sub?: string } | undefined)?.sub ?? null;
    const maxAgeMinutes = parseMaxAge(query);

    let params = pickParams(query);
    if (userId) {
      const pref = await prisma.userPreference.findUnique({ where: { userId } });
      if (pref) {
        if (params.language === undefined && pref.maptilerLanguage) params = { ...params, language: pref.maptilerLanguage };
        if (params.style === undefined && pref.maptilerStyle) params = { ...params, style: pref.maptilerStyle };
      }
    }

    const { cached, response, signature, kind } = await fetchMaptilerWithCache(
      prisma as any,
      { path, params, responseType },
      { maxAgeMinutes, userId },
    );

    await recordTelemetry(request, {
      eventType: `maptiler.${kind}.${cached ? "cached" : "fetched"}`,
      source: "api",
      payload: { path, cached },
    });

    if (userId) {
      const now = new Date();
      const styleUpdate = typeof params.style === "string" ? { maptilerStyle: params.style } : {};
      const languageUpdate = typeof params.language === "string" ? { maptilerLanguage: params.language } : {};
      await prisma.userPreference.upsert({
        where: { userId },
        create: {
          userId,
          maptilerLastPath: path,
          maptilerLastParams: params ?? {},
          maptilerLastKind: kind,
          maptilerLastSignature: signature,
          maptilerLastFetchedAt: now,
          ...styleUpdate,
          ...languageUpdate,
        },
        update: {
          maptilerLastPath: path,
          maptilerLastParams: params ?? {},
          maptilerLastKind: kind,
          maptilerLastSignature: signature,
          maptilerLastFetchedAt: now,
          ...styleUpdate,
          ...languageUpdate,
        },
      });
    }

    if (!response.ok) return reply.status(response.status).send(response.body ?? { error: "MapTiler error" });

    if (response.contentType) reply.header("Content-Type", response.contentType);
    if (response.cacheControl) reply.header("Cache-Control", response.cacheControl);
    reply.header("X-Cache", cached ? "HIT" : "MISS");

    if (responseType === "arrayBuffer" && response.data) {
      return reply.send(response.data);
    }

    return response.body;
  };

  server.get(
    "/maptiler/json",
    {
      ...optionalAuth,
      rateLimit: { max: MAPTILER_RATE_LIMIT_MAX, timeWindow: MAPTILER_RATE_LIMIT_WINDOW },
      schema: {
        summary: "Proxy MapTiler Cloud JSON endpoints with caching",
        tags: ["maptiler"],
      },
    },
    async (request, reply) => handler("json", request, reply),
  );

  server.get(
    "/maptiler/tiles",
    {
      ...optionalAuth,
      rateLimit: { max: MAPTILER_RATE_LIMIT_MAX, timeWindow: MAPTILER_RATE_LIMIT_WINDOW },
      schema: {
        summary: "Proxy MapTiler Cloud binary endpoints (tiles/static) with caching",
        tags: ["maptiler"],
      },
    },
    async (request, reply) => handler("arrayBuffer", request, reply),
  );
}
