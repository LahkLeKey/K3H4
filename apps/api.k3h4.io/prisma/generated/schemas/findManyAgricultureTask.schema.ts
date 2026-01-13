import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureTaskIncludeObjectSchema as AgricultureTaskIncludeObjectSchema } from './objects/AgricultureTaskInclude.schema';
import { AgricultureTaskOrderByWithRelationInputObjectSchema as AgricultureTaskOrderByWithRelationInputObjectSchema } from './objects/AgricultureTaskOrderByWithRelationInput.schema';
import { AgricultureTaskWhereInputObjectSchema as AgricultureTaskWhereInputObjectSchema } from './objects/AgricultureTaskWhereInput.schema';
import { AgricultureTaskWhereUniqueInputObjectSchema as AgricultureTaskWhereUniqueInputObjectSchema } from './objects/AgricultureTaskWhereUniqueInput.schema';
import { AgricultureTaskScalarFieldEnumSchema } from './enums/AgricultureTaskScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const AgricultureTaskFindManySelectSchema: z.ZodType<Prisma.AgricultureTaskSelect> = z.object({
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

export const AgricultureTaskFindManySelectZodSchema = z.object({
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

export const AgricultureTaskFindManySchema: z.ZodType<Prisma.AgricultureTaskFindManyArgs> = z.object({ select: AgricultureTaskFindManySelectSchema.optional(), include: z.lazy(() => AgricultureTaskIncludeObjectSchema.optional()), orderBy: z.union([AgricultureTaskOrderByWithRelationInputObjectSchema, AgricultureTaskOrderByWithRelationInputObjectSchema.array()]).optional(), where: AgricultureTaskWhereInputObjectSchema.optional(), cursor: AgricultureTaskWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([AgricultureTaskScalarFieldEnumSchema, AgricultureTaskScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureTaskFindManyArgs>;

export const AgricultureTaskFindManyZodSchema = z.object({ select: AgricultureTaskFindManySelectSchema.optional(), include: z.lazy(() => AgricultureTaskIncludeObjectSchema.optional()), orderBy: z.union([AgricultureTaskOrderByWithRelationInputObjectSchema, AgricultureTaskOrderByWithRelationInputObjectSchema.array()]).optional(), where: AgricultureTaskWhereInputObjectSchema.optional(), cursor: AgricultureTaskWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([AgricultureTaskScalarFieldEnumSchema, AgricultureTaskScalarFieldEnumSchema.array()]).optional() }).strict();