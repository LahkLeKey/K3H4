import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingRoleOrderByWithRelationInputObjectSchema as StaffingRoleOrderByWithRelationInputObjectSchema } from './objects/StaffingRoleOrderByWithRelationInput.schema';
import { StaffingRoleWhereInputObjectSchema as StaffingRoleWhereInputObjectSchema } from './objects/StaffingRoleWhereInput.schema';
import { StaffingRoleWhereUniqueInputObjectSchema as StaffingRoleWhereUniqueInputObjectSchema } from './objects/StaffingRoleWhereUniqueInput.schema';
import { StaffingRoleCountAggregateInputObjectSchema as StaffingRoleCountAggregateInputObjectSchema } from './objects/StaffingRoleCountAggregateInput.schema';

export const StaffingRoleCountSchema: z.ZodType<Prisma.StaffingRoleCountArgs> = z.object({ orderBy: z.union([StaffingRoleOrderByWithRelationInputObjectSchema, StaffingRoleOrderByWithRelationInputObjectSchema.array()]).optional(), where: StaffingRoleWhereInputObjectSchema.optional(), cursor: StaffingRoleWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), StaffingRoleCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.StaffingRoleCountArgs>;

export const StaffingRoleCountZodSchema = z.object({ orderBy: z.union([StaffingRoleOrderByWithRelationInputObjectSchema, StaffingRoleOrderByWithRelationInputObjectSchema.array()]).optional(), where: StaffingRoleWhereInputObjectSchema.optional(), cursor: StaffingRoleWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), StaffingRoleCountAggregateInputObjectSchema ]).optional() }).strict();