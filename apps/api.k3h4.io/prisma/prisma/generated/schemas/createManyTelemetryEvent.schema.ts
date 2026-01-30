import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { TelemetryEventCreateManyInputObjectSchema as TelemetryEventCreateManyInputObjectSchema } from './objects/TelemetryEventCreateManyInput.schema';

export const TelemetryEventCreateManySchema: z.ZodType<Prisma.TelemetryEventCreateManyArgs> = z.object({ data: z.union([ TelemetryEventCreateManyInputObjectSchema, z.array(TelemetryEventCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.TelemetryEventCreateManyArgs>;

export const TelemetryEventCreateManyZodSchema = z.object({ data: z.union([ TelemetryEventCreateManyInputObjectSchema, z.array(TelemetryEventCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();