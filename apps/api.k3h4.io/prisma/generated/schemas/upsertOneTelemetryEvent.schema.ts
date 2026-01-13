import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { TelemetryEventSelectObjectSchema as TelemetryEventSelectObjectSchema } from './objects/TelemetryEventSelect.schema';
import { TelemetryEventIncludeObjectSchema as TelemetryEventIncludeObjectSchema } from './objects/TelemetryEventInclude.schema';
import { TelemetryEventWhereUniqueInputObjectSchema as TelemetryEventWhereUniqueInputObjectSchema } from './objects/TelemetryEventWhereUniqueInput.schema';
import { TelemetryEventCreateInputObjectSchema as TelemetryEventCreateInputObjectSchema } from './objects/TelemetryEventCreateInput.schema';
import { TelemetryEventUncheckedCreateInputObjectSchema as TelemetryEventUncheckedCreateInputObjectSchema } from './objects/TelemetryEventUncheckedCreateInput.schema';
import { TelemetryEventUpdateInputObjectSchema as TelemetryEventUpdateInputObjectSchema } from './objects/TelemetryEventUpdateInput.schema';
import { TelemetryEventUncheckedUpdateInputObjectSchema as TelemetryEventUncheckedUpdateInputObjectSchema } from './objects/TelemetryEventUncheckedUpdateInput.schema';

export const TelemetryEventUpsertOneSchema: z.ZodType<Prisma.TelemetryEventUpsertArgs> = z.object({ select: TelemetryEventSelectObjectSchema.optional(), include: TelemetryEventIncludeObjectSchema.optional(), where: TelemetryEventWhereUniqueInputObjectSchema, create: z.union([ TelemetryEventCreateInputObjectSchema, TelemetryEventUncheckedCreateInputObjectSchema ]), update: z.union([ TelemetryEventUpdateInputObjectSchema, TelemetryEventUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.TelemetryEventUpsertArgs>;

export const TelemetryEventUpsertOneZodSchema = z.object({ select: TelemetryEventSelectObjectSchema.optional(), include: TelemetryEventIncludeObjectSchema.optional(), where: TelemetryEventWhereUniqueInputObjectSchema, create: z.union([ TelemetryEventCreateInputObjectSchema, TelemetryEventUncheckedCreateInputObjectSchema ]), update: z.union([ TelemetryEventUpdateInputObjectSchema, TelemetryEventUncheckedUpdateInputObjectSchema ]) }).strict();