import { PrismaClient } from "@prisma/client";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { fetchOsrmWithCache } from "../services/osrm-cache";
import { type RecordTelemetryFn } from "./types";

const DEFAULT_MAX_AGE_MINUTES = 60 * 6; // 6 hours

type OsrmQuery = {
  profile?: string;
  coordinates?: string;
  format?: string;
  maxAgeMinutes?: string | number;
  [key: string]: string | number | boolean | undefined;
};

const required = (reply: FastifyReply, message: string) => reply.status(400).send({ error: message });

const coerceNumber = (value: unknown) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0 && Number.isFinite(Number(value))) return Number(value);
  return null;
};

const pickParams = (query: OsrmQuery) => {
  const { profile, coordinates, format, maxAgeMinutes, ...rest } = query;
  return rest;
};

const parseMaxAge = (query: OsrmQuery) => coerceNumber(query.maxAgeMinutes ?? DEFAULT_MAX_AGE_MINUTES) ?? DEFAULT_MAX_AGE_MINUTES;

const allowedServices = new Set(["route", "table", "match", "trip", "nearest", "tile"]);

export function registerOsrmRoutes(server: FastifyInstance, prisma: PrismaClient, recordTelemetry: RecordTelemetryFn) {
  const auth = { preHandler: [server.authenticate] };

  const handler = async (service: string, request: FastifyRequest, reply: FastifyReply) => {
    if (!allowedServices.has(service)) return required(reply, "service is invalid");
    const query = request.query as OsrmQuery;
    const profile = query.profile?.trim();
    const coordinates = query.coordinates?.trim();
    if (!profile) return required(reply, "profile is required");
    if (!coordinates) return required(reply, "coordinates are required");

    const maxAgeMinutes = parseMaxAge(query);
    const params = pickParams(query);

    const { cached, response } = await fetchOsrmWithCache(
      prisma as any,
      {
        service: service as any,
        profile,
        coordinates,
        format: query.format === "flatbuffers" ? "flatbuffers" : "json",
        params,
      },
      { maxAgeMinutes },
    );

    await recordTelemetry(request, {
      eventType: `osrm.${service}.${cached ? "cached" : "fetched"}`,
      source: "api",
      payload: { profile, coordinates, cached },
    });

    if (!response.ok) return reply.status(response.status).send(response.body ?? { error: "OSRM error" });
    return response.body;
  };

  server.get("/osrm/route", { ...auth }, async (request, reply) => handler("route", request, reply));
  server.get("/osrm/table", { ...auth }, async (request, reply) => handler("table", request, reply));
  server.get("/osrm/match", { ...auth }, async (request, reply) => handler("match", request, reply));
  server.get("/osrm/trip", { ...auth }, async (request, reply) => handler("trip", request, reply));
  server.get("/osrm/nearest", { ...auth }, async (request, reply) => handler("nearest", request, reply));
  server.get("/osrm/tile", { ...auth }, async (request, reply) => handler("tile", request, reply));
}