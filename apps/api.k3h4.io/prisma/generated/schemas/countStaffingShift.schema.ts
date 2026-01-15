import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingShiftOrderByWithRelationInputObjectSchema as StaffingShiftOrderByWithRelationInputObjectSchema } from './objects/StaffingShiftOrderByWithRelationInput.schema';
import { StaffingShiftWhereInputObjectSchema as StaffingShiftWhereInputObjectSchema } from './objects/StaffingShiftWhereInput.schema';
import { StaffingShiftWhereUniqueInputObjectSchema as StaffingShiftWhereUniqueInputObjectSchema } from './objects/StaffingShiftWhereUniqueInput.schema';
import { StaffingShiftCountAggregateInputObjectSchema as StaffingShiftCountAggregateInputObjectSchema } from './objects/StaffingShiftCountAggregateInput.schema';

export const StaffingShiftCountSchema: z.ZodType<Prisma.StaffingShiftCountArgs> = z.object({ orderBy: z.union([StaffingShiftOrderByWithRelationInputObjectSchema, StaffingShiftOrderByWithRelationInputObjectSchema.array()]).optional(), where: StaffingShiftWhereInputObjectSchema.optional(), cursor: StaffingShiftWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), StaffingShiftCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.StaffingShiftCountArgs>;

export const StaffingShiftCountZodSchema = z.object({ orderBy: z.union([StaffingShiftOrderByWithRelationInputObjectSchema, StaffingShiftOrderByWithRelationInputObjectSchema.array()]).optional(), where: StaffingShiftWhereInputObjectSchema.optional(), cursor: StaffingShiftWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), StaffingShiftCountAggregateInputObjectSchema ]).optional() }).strict();