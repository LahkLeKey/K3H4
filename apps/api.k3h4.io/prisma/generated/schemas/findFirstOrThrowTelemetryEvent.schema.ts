import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { TelemetryEventIncludeObjectSchema as TelemetryEventIncludeObjectSchema } from './objects/TelemetryEventInclude.schema';
import { TelemetryEventOrderByWithRelationInputObjectSchema as TelemetryEventOrderByWithRelationInputObjectSchema } from './objects/TelemetryEventOrderByWithRelationInput.schema';
import { TelemetryEventWhereInputObjectSchema as TelemetryEventWhereInputObjectSchema } from './objects/TelemetryEventWhereInput.schema';
import { TelemetryEventWhereUniqueInputObjectSchema as TelemetryEventWhereUniqueInputObjectSchema } from './objects/TelemetryEventWhereUniqueInput.schema';
import { TelemetryEventScalarFieldEnumSchema } from './enums/TelemetryEventScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const TelemetryEventFindFirstOrThrowSelectSchema: z.ZodType<Prisma.TelemetryEventSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    sessionId: z.boolean().optional(),
    eventType: z.boolean().optional(),
    source: z.boolean().optional(),
    path: z.boolean().optional(),
    payload: z.boolean().optional(),
    durationMs: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.TelemetryEventSelect>;

export const TelemetryEventFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    sessionId: z.boolean().optional(),
    eventType: z.boolean().optional(),
    source: z.boolean().optional(),
    path: z.boolean().optional(),
    payload: z.boolean().optional(),
    durationMs: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict();

export const TelemetryEventFindFirstOrThrowSchema: z.ZodType<Prisma.TelemetryEventFindFirstOrThrowArgs> = z.object({ select: TelemetryEventFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => TelemetryEventIncludeObjectSchema.optional()), orderBy: z.union([TelemetryEventOrderByWithRelationInputObjectSchema, TelemetryEventOrderByWithRelationInputObjectSchema.array()]).optional(), where: TelemetryEventWhereInputObjectSchema.optional(), cursor: TelemetryEventWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([TelemetryEventScalarFieldEnumSchema, TelemetryEventScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.TelemetryEventFindFirstOrThrowArgs>;

export const TelemetryEventFindFirstOrThrowZodSchema = z.object({ select: TelemetryEventFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => TelemetryEventIncludeObjectSchema.optional()), orderBy: z.union([TelemetryEventOrderByWithRelationInputObjectSchema, TelemetryEventOrderByWithRelationInputObjectSchema.array()]).optional(), where: TelemetryEventWhereInputObjectSchema.optional(), cursor: TelemetryEventWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([TelemetryEventScalarFieldEnumSchema, TelemetryEventScalarFieldEnumSchema.array()]).optional() }).strict();