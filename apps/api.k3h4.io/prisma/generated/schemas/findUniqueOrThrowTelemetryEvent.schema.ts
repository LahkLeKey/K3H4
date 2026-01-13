import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { TelemetryEventSelectObjectSchema as TelemetryEventSelectObjectSchema } from './objects/TelemetryEventSelect.schema';
import { TelemetryEventIncludeObjectSchema as TelemetryEventIncludeObjectSchema } from './objects/TelemetryEventInclude.schema';
import { TelemetryEventWhereUniqueInputObjectSchema as TelemetryEventWhereUniqueInputObjectSchema } from './objects/TelemetryEventWhereUniqueInput.schema';

export const TelemetryEventFindUniqueOrThrowSchema: z.ZodType<Prisma.TelemetryEventFindUniqueOrThrowArgs> = z.object({ select: TelemetryEventSelectObjectSchema.optional(), include: TelemetryEventIncludeObjectSchema.optional(), where: TelemetryEventWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.TelemetryEventFindUniqueOrThrowArgs>;

export const TelemetryEventFindUniqueOrThrowZodSchema = z.object({ select: TelemetryEventSelectObjectSchema.optional(), include: TelemetryEventIncludeObjectSchema.optional(), where: TelemetryEventWhereUniqueInputObjectSchema }).strict();