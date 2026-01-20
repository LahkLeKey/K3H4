import { type PrismaClient } from "@prisma/client";
import { type FastifyInstance, type FastifyReply, type FastifyRequest } from "fastify";

const parseIncludeGeometry = (value: unknown) => `${value}`.toLowerCase() === "true" || value === true;

const serializeGeometry = (raw: unknown) => {
    if (!raw) return null;
    if (typeof raw === "string") {
        try {
            return JSON.parse(raw);
        } catch {
            return null;
        }
    }
    return raw as any;
};

const serializeBuilding = (row: any, includeGeometry: boolean) => {
    if (!row) return null;
    const geometry = includeGeometry ? serializeGeometry(row.geometry ?? null) : undefined;
    return {
        id: row.id,
        osmId: row.osmId !== null && row.osmId !== undefined ? Number(row.osmId) : null,
        type: row.type,
        addressHouseNumber: row.addressHouseNumber,
        addressStreet: row.addressStreet,
        addressCity: row.addressCity,
        addressPostcode: row.addressPostcode,
        addressState: row.addressState,
        addressCountry: row.addressCountry,
        geometry: includeGeometry ? geometry ?? null : undefined,
    };
};
const baseSelect = {
    id: true,
    osmId: true,
    type: true,
    addressHouseNumber: true,
    addressStreet: true,
    addressCity: true,
    addressPostcode: true,
    addressState: true,
    addressCountry: true,
    geometry: true,
} as const;

async function fetchById(prisma: PrismaClient, id: number) {
    return prisma.building.findUnique({ where: { id }, select: baseSelect });
}

async function fetchByOsmId(prisma: PrismaClient, osmId: bigint) {
    return prisma.building.findUnique({ where: { osmId }, select: baseSelect });
}

const handleNotFound = (reply: FastifyReply) => reply.status(404).send({ error: "building not found" });

export function registerBuildingRoutes(server: FastifyInstance, prisma: PrismaClient) {
    server.get(
        "/buildings/lookup",
        async (request: FastifyRequest, reply: FastifyReply) => {
            const query = request.query as Record<string, unknown>;
            const includeGeometry = parseIncludeGeometry(query.includeGeometry);

            const id = query.id !== undefined ? Number(query.id) : undefined;
            const osmId = query.osmId !== undefined ? BigInt(query.osmId as any) : undefined;
            const lat = query.lat !== undefined ? Number(query.lat) : undefined;
            const lng = query.lng !== undefined ? Number(query.lng) : undefined;

            let row: any = null;

            if (Number.isFinite(id)) {
                row = await fetchById(prisma, id as number);
            } else if (osmId !== undefined && !Number.isNaN(osmId as any)) {
                row = await fetchByOsmId(prisma, osmId as bigint);
            } else if (Number.isFinite(lat) && Number.isFinite(lng)) {
                return reply.status(400).send({ error: "lat/lng lookup requires PostGIS; use id or osmId" });
            } else {
                return reply.status(400).send({ error: "provide id/osmId" });
            }

            if (!row) return handleNotFound(reply);
            return { building: serializeBuilding(row, includeGeometry) };
        },
    );

    server.get(
        "/buildings/:id",
        async (request: FastifyRequest, reply: FastifyReply) => {
            const params = request.params as { id?: string };
            const includeGeometry = parseIncludeGeometry((request.query as Record<string, unknown>).includeGeometry);
            const id = Number(params.id);
            if (!Number.isFinite(id)) return reply.status(400).send({ error: "id must be a number" });

            const row = await fetchById(prisma, id);
            if (!row) return handleNotFound(reply);
            return { building: serializeBuilding(row, includeGeometry) };
        },
    );
}
