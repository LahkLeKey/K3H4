import { faker } from "@faker-js/faker";
import { Prisma, type PrismaClient } from "@prisma/client";
import { type FastifyInstance } from "fastify";
import { buildTelemetryBase } from "./telemetry";
import { type RecordTelemetryFn } from "./types";

const serializeMoney = (value: Prisma.Decimal) => value.toFixed(2);

const serializeAssignment = (assignment: any) => ({
  ...assignment,
  hourlyRate: serializeMoney(assignment.hourlyRate),
  persona: assignment.persona,
  timecards: assignment.timecards?.map((tc: any) => ({
    ...tc,
    hours: serializeMoney(tc.hours),
    amount: serializeMoney(tc.amount),
  })) ?? [],
  payouts: assignment.payouts?.map((p: any) => ({
    ...p,
    amount: serializeMoney(p.amount),
  })) ?? [],
});

const assertUserOwnsAssignment = async (prisma: PrismaClient, userId: string, assignmentId: string) => {
  const assignment = await prisma.assignment.findFirst({ where: { id: assignmentId, userId } });
  if (!assignment) throw new Error("Assignment not found");
  return assignment;
};

export function registerAssignmentRoutes(server: FastifyInstance, prisma: PrismaClient, recordTelemetry: RecordTelemetryFn) {
  server.get(
    "/assignments",
    { preHandler: [server.authenticate] },
    async (request, reply) => {
      const userId = (request.user as { sub: string }).sub;

      const assignments = await prisma.assignment.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        include: {
          persona: { select: { id: true, alias: true, account: true, handle: true } },
          timecards: { orderBy: { createdAt: "desc" } },
          payouts: { orderBy: { createdAt: "desc" } },
        },
      });

      await recordTelemetry(request, {
        ...buildTelemetryBase(request),
        eventType: "assignment.list",
        source: "api",
        payload: { count: assignments.length },
      });

      return { assignments: assignments.map(serializeAssignment) };
    },
  );

  server.post(
    "/assignments",
    { preHandler: [server.authenticate] },
    async (request, reply) => {
      const userId = (request.user as { sub: string }).sub;
      const body = request.body as { title?: string; personaId?: string; hourlyRate?: number | string } | undefined;

      const title = body?.title?.trim();
      const personaId = body?.personaId?.trim();
      const hourlyRate = body?.hourlyRate !== undefined ? Number(body.hourlyRate) : 100;
      if (!title || !personaId) return reply.status(400).send({ error: "title and personaId are required" });
      if (!Number.isFinite(hourlyRate) || hourlyRate <= 0) return reply.status(400).send({ error: "hourlyRate must be positive" });

      const persona = await prisma.persona.findFirst({ where: { id: personaId, userId }, select: { id: true } });
      if (!persona) return reply.status(404).send({ error: "Persona not found" });

      const assignment = await prisma.assignment.create({
        data: {
          userId,
          personaId,
          title,
          hourlyRate: new Prisma.Decimal(hourlyRate.toFixed(2)),
        },
        include: {
          persona: { select: { id: true, alias: true, account: true, handle: true } },
          timecards: true,
          payouts: true,
        },
      });

      await recordTelemetry(request, {
        ...buildTelemetryBase(request),
        eventType: "assignment.create",
        source: "api",
        payload: { personaId },
      });

      return { assignment: serializeAssignment(assignment) };
    },
  );

  server.post(
    "/assignments/:id/timecards",
    { preHandler: [server.authenticate] },
    async (request, reply) => {
      const userId = (request.user as { sub: string }).sub;
      const assignmentId = (request.params as { id: string }).id;
      const body = request.body as { hours?: number | string; note?: string } | undefined;

      const assignment = await assertUserOwnsAssignment(prisma, userId, assignmentId);
      const hours = body?.hours !== undefined ? Number(body.hours) : NaN;
      if (!Number.isFinite(hours) || hours <= 0) return reply.status(400).send({ error: "hours must be positive" });

      const amount = new Prisma.Decimal((hours * Number(assignment.hourlyRate)).toFixed(2));

      const timecard = await prisma.assignmentTimecard.create({
        data: {
          assignmentId,
          hours: new Prisma.Decimal(hours.toFixed(2)),
          amount,
          note: body?.note?.trim() || null,
          status: "approved",
        },
      });

      await recordTelemetry(request, {
        ...buildTelemetryBase(request),
        eventType: "assignment.timecard.create",
        source: "api",
        payload: { assignmentId, hours, amount: amount.toFixed(2) },
      });

      const updated = await prisma.assignment.findUnique({
        where: { id: assignmentId },
        include: {
          persona: { select: { id: true, alias: true, account: true, handle: true } },
          timecards: { orderBy: { createdAt: "desc" } },
          payouts: { orderBy: { createdAt: "desc" } },
        },
      });

      return { assignment: updated ? serializeAssignment(updated) : null, timecard: serializeAssignment({ timecards: [timecard], hourlyRate: assignment.hourlyRate }).timecards[0] };
    },
  );

  server.post(
    "/assignments/:id/pay",
    { preHandler: [server.authenticate] },
    async (request, reply) => {
      const userId = (request.user as { sub: string }).sub;
      const assignmentId = (request.params as { id: string }).id;
      const body = request.body as { timecardId?: string; note?: string } | undefined;

      const assignment = await prisma.assignment.findFirst({
        where: { id: assignmentId, userId },
        include: {
          persona: true,
          timecards: true,
        },
      });

      if (!assignment) return reply.status(404).send({ error: "Assignment not found" });

      const timecardId = body?.timecardId?.trim();
      const timecard = assignment.timecards.find((tc) => tc.id === timecardId);
      if (!timecard) return reply.status(404).send({ error: "Timecard not found" });
      if (timecard.status === "paid") return reply.status(400).send({ error: "Timecard already paid" });

      const amount = timecard.amount;

      try {
        const result = await prisma.$transaction(async (tx) => {
          const user = await tx.user.findUnique({ where: { id: userId }, select: { k3h4CoinBalance: true } });
          if (!user) throw new Error("User not found");

          const nextBalance = user.k3h4CoinBalance.sub(amount);
          const savedUser = await tx.user.update({ where: { id: userId }, data: { k3h4CoinBalance: nextBalance } });
          const bankTxn = await tx.bankTransaction.create({
            data: {
              userId,
              amount,
              direction: "debit",
              kind: "assignment_payout",
              note: body?.note ?? `Payout for ${assignment.title} (${assignment.persona.alias})`,
              balanceAfter: savedUser.k3h4CoinBalance,
            },
          });

          const payout = await tx.assignmentPayout.create({
            data: {
              assignmentId,
              personaId: assignment.personaId,
              amount,
              note: body?.note ?? `Timecard payout ${timecard.id}`,
              invoiceUrl: `https://invoices.k3h4.local/${faker.string.alphanumeric(8).toLowerCase()}`,
              status: "paid",
            },
          });

          await tx.assignmentTimecard.update({ where: { id: timecard.id }, data: { status: "paid" } });

          return { nextBalance, bankTxn, payout };
        });

        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: "assignment.payout",
          source: "api",
          payload: { assignmentId, timecardId, amount: amount.toFixed(2) },
        });

        const updated = await prisma.assignment.findUnique({
          where: { id: assignmentId },
          include: {
            persona: { select: { id: true, alias: true, account: true, handle: true } },
            timecards: { orderBy: { createdAt: "desc" } },
            payouts: { orderBy: { createdAt: "desc" } },
          },
        });

        return { assignment: updated ? serializeAssignment(updated) : null, payout: serializeAssignment({ payouts: [result.payout], hourlyRate: assignment.hourlyRate }).payouts[0] };
      } catch (err) {
        request.log.error({ err }, "assignment payout failed");
        return reply.status(400).send({ error: err instanceof Error ? err.message : "Unable to process payout" });
      }
    },
  );
}
