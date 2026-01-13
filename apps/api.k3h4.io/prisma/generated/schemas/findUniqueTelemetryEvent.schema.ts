import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { TelemetryEventSelectObjectSchema as TelemetryEventSelectObjectSchema } from './objects/TelemetryEventSelect.schema';
import { TelemetryEventIncludeObjectSchema as TelemetryEventIncludeObjectSchema } from './objects/TelemetryEventInclude.schema';
import { TelemetryEventWhereUniqueInputObjectSchema as TelemetryEventWhereUniqueInputObjectSchema } from './objects/TelemetryEventWhereUniqueInput.schema';

export const TelemetryEventFindUniqueSchema: z.ZodType<Prisma.TelemetryEventFindUniqueArgs> = z.object({ select: TelemetryEventSelectObjectSchema.optional(), include: TelemetryEventIncludeObjectSchema.optional(), where: TelemetryEventWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.TelemetryEventFindUniqueArgs>;

export const TelemetryEventFindUniqueZodSchema = z.object({ select: TelemetryEventSelectObjectSchema.optional(), include: TelemetryEventIncludeObjectSchema.optional(), where: TelemetryEventWhereUniqueInputObjectSchema }).strict();