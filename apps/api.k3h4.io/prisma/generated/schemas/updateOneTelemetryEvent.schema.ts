import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { TelemetryEventSelectObjectSchema as TelemetryEventSelectObjectSchema } from './objects/TelemetryEventSelect.schema';
import { TelemetryEventIncludeObjectSchema as TelemetryEventIncludeObjectSchema } from './objects/TelemetryEventInclude.schema';
import { TelemetryEventUpdateInputObjectSchema as TelemetryEventUpdateInputObjectSchema } from './objects/TelemetryEventUpdateInput.schema';
import { TelemetryEventUncheckedUpdateInputObjectSchema as TelemetryEventUncheckedUpdateInputObjectSchema } from './objects/TelemetryEventUncheckedUpdateInput.schema';
import { TelemetryEventWhereUniqueInputObjectSchema as TelemetryEventWhereUniqueInputObjectSchema } from './objects/TelemetryEventWhereUniqueInput.schema';

export const TelemetryEventUpdateOneSchema: z.ZodType<Prisma.TelemetryEventUpdateArgs> = z.object({ select: TelemetryEventSelectObjectSchema.optional(), include: TelemetryEventIncludeObjectSchema.optional(), data: z.union([TelemetryEventUpdateInputObjectSchema, TelemetryEventUncheckedUpdateInputObjectSchema]), where: TelemetryEventWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.TelemetryEventUpdateArgs>;

export const TelemetryEventUpdateOneZodSchema = z.object({ select: TelemetryEventSelectObjectSchema.optional(), include: TelemetryEventIncludeObjectSchema.optional(), data: z.union([TelemetryEventUpdateInputObjectSchema, TelemetryEventUncheckedUpdateInputObjectSchema]), where: TelemetryEventWhereUniqueInputObjectSchema }).strict();