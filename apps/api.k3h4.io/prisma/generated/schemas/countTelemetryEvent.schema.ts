import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { TelemetryEventOrderByWithRelationInputObjectSchema as TelemetryEventOrderByWithRelationInputObjectSchema } from './objects/TelemetryEventOrderByWithRelationInput.schema';
import { TelemetryEventWhereInputObjectSchema as TelemetryEventWhereInputObjectSchema } from './objects/TelemetryEventWhereInput.schema';
import { TelemetryEventWhereUniqueInputObjectSchema as TelemetryEventWhereUniqueInputObjectSchema } from './objects/TelemetryEventWhereUniqueInput.schema';
import { TelemetryEventCountAggregateInputObjectSchema as TelemetryEventCountAggregateInputObjectSchema } from './objects/TelemetryEventCountAggregateInput.schema';

export const TelemetryEventCountSchema: z.ZodType<Prisma.TelemetryEventCountArgs> = z.object({ orderBy: z.union([TelemetryEventOrderByWithRelationInputObjectSchema, TelemetryEventOrderByWithRelationInputObjectSchema.array()]).optional(), where: TelemetryEventWhereInputObjectSchema.optional(), cursor: TelemetryEventWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), TelemetryEventCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.TelemetryEventCountArgs>;

export const TelemetryEventCountZodSchema = z.object({ orderBy: z.union([TelemetryEventOrderByWithRelationInputObjectSchema, TelemetryEventOrderByWithRelationInputObjectSchema.array()]).optional(), where: TelemetryEventWhereInputObjectSchema.optional(), cursor: TelemetryEventWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), TelemetryEventCountAggregateInputObjectSchema ]).optional() }).strict();