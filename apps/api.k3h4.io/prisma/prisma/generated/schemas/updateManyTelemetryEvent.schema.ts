import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { TelemetryEventUpdateManyMutationInputObjectSchema as TelemetryEventUpdateManyMutationInputObjectSchema } from './objects/TelemetryEventUpdateManyMutationInput.schema';
import { TelemetryEventWhereInputObjectSchema as TelemetryEventWhereInputObjectSchema } from './objects/TelemetryEventWhereInput.schema';

export const TelemetryEventUpdateManySchema: z.ZodType<Prisma.TelemetryEventUpdateManyArgs> = z.object({ data: TelemetryEventUpdateManyMutationInputObjectSchema, where: TelemetryEventWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.TelemetryEventUpdateManyArgs>;

export const TelemetryEventUpdateManyZodSchema = z.object({ data: TelemetryEventUpdateManyMutationInputObjectSchema, where: TelemetryEventWhereInputObjectSchema.optional() }).strict();