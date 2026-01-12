import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { TelemetryEventSelectObjectSchema as TelemetryEventSelectObjectSchema } from './objects/TelemetryEventSelect.schema';
import { TelemetryEventIncludeObjectSchema as TelemetryEventIncludeObjectSchema } from './objects/TelemetryEventInclude.schema';
import { TelemetryEventCreateInputObjectSchema as TelemetryEventCreateInputObjectSchema } from './objects/TelemetryEventCreateInput.schema';
import { TelemetryEventUncheckedCreateInputObjectSchema as TelemetryEventUncheckedCreateInputObjectSchema } from './objects/TelemetryEventUncheckedCreateInput.schema';

export const TelemetryEventCreateOneSchema: z.ZodType<Prisma.TelemetryEventCreateArgs> = z.object({ select: TelemetryEventSelectObjectSchema.optional(), include: TelemetryEventIncludeObjectSchema.optional(), data: z.union([TelemetryEventCreateInputObjectSchema, TelemetryEventUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.TelemetryEventCreateArgs>;

export const TelemetryEventCreateOneZodSchema = z.object({ select: TelemetryEventSelectObjectSchema.optional(), include: TelemetryEventIncludeObjectSchema.optional(), data: z.union([TelemetryEventCreateInputObjectSchema, TelemetryEventUncheckedCreateInputObjectSchema]) }).strict();