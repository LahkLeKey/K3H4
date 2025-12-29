import { faker } from "@faker-js/faker";
import { type Prisma, type PrismaClient } from "@prisma/client";
import { type FastifyInstance } from "fastify";
import { type RecordTelemetryFn } from "./types";

const serializePersona = (persona: {
  id: string;
  alias: string;
  account: string;
  handle: string | null;
  note: string | null;
  tags: Prisma.JsonValue | null;
  createdAt: Date;
  updatedAt: Date;
}) => ({
  ...persona,
  handle: persona.handle ?? undefined,
  note: persona.note ?? undefined,
  tags: Array.isArray(persona.tags) ? (persona.tags as string[]) : [],
});

const buildFakerPersona = () => ({
  alias: faker.person.fullName(),
  account: faker.internet.email().toLowerCase(),
  handle: `@${faker.internet.username().toLowerCase()}`,
  note: faker.hacker.phrase(),
  tags: [faker.hacker.noun(), faker.company.buzzNoun()].map((tag) => tag.toLowerCase()),
});

export function registerPersonaRoutes(server: FastifyInstance, prisma: PrismaClient, recordTelemetry: RecordTelemetryFn) {
  server.get(
    "/personas",
    { preHandler: [server.authenticate] },
    async (request, reply) => {
      const userId = (request.user as { sub: string }).sub;

      let personas = await prisma.persona.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });

      if (personas.length === 0) {
        const seedPayload = Array.from({ length: 3 }).map(() => ({ ...buildFakerPersona(), userId }));
        await prisma.persona.createMany({ data: seedPayload });
        personas = await prisma.persona.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });
        await recordTelemetry(request, {
          eventType: "persona.seed",
          source: "api",
          payload: { count: seedPayload.length },
        });
      }

      await recordTelemetry(request, {
        eventType: "persona.list",
        source: "api",
        payload: { count: personas.length },
      });

      return { personas: personas.map(serializePersona) };
    },
  );

  server.post(
    "/personas",
    { preHandler: [server.authenticate] },
    async (request, reply) => {
      const userId = (request.user as { sub: string }).sub;
      const body = request.body as { alias?: string; account?: string; handle?: string; note?: string; tags?: string[] } | undefined;

      const alias = body?.alias?.trim();
      const account = body?.account?.trim();
      if (!alias || !account) return reply.status(400).send({ error: "alias and account are required" });

      const persona = await prisma.persona.create({
        data: {
          userId,
          alias,
          account,
          handle: body?.handle?.trim() || null,
          note: body?.note?.trim() || null,
          tags: Array.isArray(body?.tags) ? body?.tags : [],
        },
      });

      await recordTelemetry(request, {
        eventType: "persona.create",
        source: "api",
        payload: { hasTags: Array.isArray(body?.tags) && body?.tags.length > 0 },
      });

      return { persona: serializePersona(persona) };
    },
  );

  server.post(
    "/personas/generate",
    { preHandler: [server.authenticate] },
    async (request, reply) => {
      const userId = (request.user as { sub: string }).sub;
      const body = request.body as { count?: number } | undefined;
      const count = (() => {
        const parsed = Number(body?.count ?? 1);
        if (!Number.isFinite(parsed)) return 1;
        return Math.min(Math.max(Math.floor(parsed), 1), 10);
      })();

      const payload = Array.from({ length: count }).map(() => ({ ...buildFakerPersona(), userId }));
      await prisma.persona.createMany({ data: payload });
      const personas = await prisma.persona.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: count });

      await recordTelemetry(request, {
        eventType: "persona.generate",
        source: "api",
        payload: { count },
      });

      return { personas: personas.map(serializePersona) };
    },
  );
}
