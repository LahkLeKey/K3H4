import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { TelemetryEventWhereInputObjectSchema as TelemetryEventWhereInputObjectSchema } from './objects/TelemetryEventWhereInput.schema';

export const TelemetryEventDeleteManySchema: z.ZodType<Prisma.TelemetryEventDeleteManyArgs> = z.object({ where: TelemetryEventWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.TelemetryEventDeleteManyArgs>;

export const TelemetryEventDeleteManyZodSchema = z.object({ where: TelemetryEventWhereInputObjectSchema.optional() }).strict();