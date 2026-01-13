import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { TelemetryEventSelectObjectSchema as TelemetryEventSelectObjectSchema } from './objects/TelemetryEventSelect.schema';
import { TelemetryEventUpdateManyMutationInputObjectSchema as TelemetryEventUpdateManyMutationInputObjectSchema } from './objects/TelemetryEventUpdateManyMutationInput.schema';
import { TelemetryEventWhereInputObjectSchema as TelemetryEventWhereInputObjectSchema } from './objects/TelemetryEventWhereInput.schema';

export const TelemetryEventUpdateManyAndReturnSchema: z.ZodType<Prisma.TelemetryEventUpdateManyAndReturnArgs> = z.object({ select: TelemetryEventSelectObjectSchema.optional(), data: TelemetryEventUpdateManyMutationInputObjectSchema, where: TelemetryEventWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.TelemetryEventUpdateManyAndReturnArgs>;

export const TelemetryEventUpdateManyAndReturnZodSchema = z.object({ select: TelemetryEventSelectObjectSchema.optional(), data: TelemetryEventUpdateManyMutationInputObjectSchema, where: TelemetryEventWhereInputObjectSchema.optional() }).strict();