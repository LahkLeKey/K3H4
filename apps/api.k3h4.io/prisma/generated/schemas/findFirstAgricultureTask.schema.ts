import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureTaskIncludeObjectSchema as AgricultureTaskIncludeObjectSchema } from './objects/AgricultureTaskInclude.schema';
import { AgricultureTaskOrderByWithRelationInputObjectSchema as AgricultureTaskOrderByWithRelationInputObjectSchema } from './objects/AgricultureTaskOrderByWithRelationInput.schema';
import { AgricultureTaskWhereInputObjectSchema as AgricultureTaskWhereInputObjectSchema } from './objects/AgricultureTaskWhereInput.schema';
import { AgricultureTaskWhereUniqueInputObjectSchema as AgricultureTaskWhereUniqueInputObjectSchema } from './objects/AgricultureTaskWhereUniqueInput.schema';
import { AgricultureTaskScalarFieldEnumSchema } from './enums/AgricultureTaskScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const AgricultureTaskFindFirstSelectSchema: z.ZodType<Prisma.AgricultureTaskSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    plotId: z.boolean().optional(),
    plot: z.boolean().optional(),
    cropPlanId: z.boolean().optional(),
    cropPlan: z.boolean().optional(),
    title: z.boolean().optional(),
    assignee: z.boolean().optional(),
    priority: z.boolean().optional(),
    tags: z.boolean().optional(),
    notes: z.boolean().optional(),
    dueDate: z.boolean().optional(),
    status: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.AgricultureTaskSelect>;

export const AgricultureTaskFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    plotId: z.boolean().optional(),
    plot: z.boolean().optional(),
    cropPlanId: z.boolean().optional(),
    cropPlan: z.boolean().optional(),
    title: z.boolean().optional(),
    assignee: z.boolean().optional(),
    priority: z.boolean().optional(),
    tags: z.boolean().optional(),
    notes: z.boolean().optional(),
    dueDate: z.boolean().optional(),
    status: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const AgricultureTaskFindFirstSchema: z.ZodType<Prisma.AgricultureTaskFindFirstArgs> = z.object({ select: AgricultureTaskFindFirstSelectSchema.optional(), include: z.lazy(() => AgricultureTaskIncludeObjectSchema.optional()), orderBy: z.union([AgricultureTaskOrderByWithRelationInputObjectSchema, AgricultureTaskOrderByWithRelationInputObjectSchema.array()]).optional(), where: AgricultureTaskWhereInputObjectSchema.optional(), cursor: AgricultureTaskWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([AgricultureTaskScalarFieldEnumSchema, AgricultureTaskScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureTaskFindFirstArgs>;

export const AgricultureTaskFindFirstZodSchema = z.object({ select: AgricultureTaskFindFirstSelectSchema.optional(), include: z.lazy(() => AgricultureTaskIncludeObjectSchema.optional()), orderBy: z.union([AgricultureTaskOrderByWithRelationInputObjectSchema, AgricultureTaskOrderByWithRelationInputObjectSchema.array()]).optional(), where: AgricultureTaskWhereInputObjectSchema.optional(), cursor: AgricultureTaskWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([AgricultureTaskScalarFieldEnumSchema, AgricultureTaskScalarFieldEnumSchema.array()]).optional() }).strict();