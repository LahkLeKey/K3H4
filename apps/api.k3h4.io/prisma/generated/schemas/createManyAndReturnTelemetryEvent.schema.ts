import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { TelemetryEventSelectObjectSchema as TelemetryEventSelectObjectSchema } from './objects/TelemetryEventSelect.schema';
import { TelemetryEventCreateManyInputObjectSchema as TelemetryEventCreateManyInputObjectSchema } from './objects/TelemetryEventCreateManyInput.schema';

export const TelemetryEventCreateManyAndReturnSchema: z.ZodType<Prisma.TelemetryEventCreateManyAndReturnArgs> = z.object({ select: TelemetryEventSelectObjectSchema.optional(), data: z.union([ TelemetryEventCreateManyInputObjectSchema, z.array(TelemetryEventCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.TelemetryEventCreateManyAndReturnArgs>;

export const TelemetryEventCreateManyAndReturnZodSchema = z.object({ select: TelemetryEventSelectObjectSchema.optional(), data: z.union([ TelemetryEventCreateManyInputObjectSchema, z.array(TelemetryEventCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();