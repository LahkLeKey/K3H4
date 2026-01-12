import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgriculturePlotConditionIncludeObjectSchema as AgriculturePlotConditionIncludeObjectSchema } from './objects/AgriculturePlotConditionInclude.schema';
import { AgriculturePlotConditionOrderByWithRelationInputObjectSchema as AgriculturePlotConditionOrderByWithRelationInputObjectSchema } from './objects/AgriculturePlotConditionOrderByWithRelationInput.schema';
import { AgriculturePlotConditionWhereInputObjectSchema as AgriculturePlotConditionWhereInputObjectSchema } from './objects/AgriculturePlotConditionWhereInput.schema';
import { AgriculturePlotConditionWhereUniqueInputObjectSchema as AgriculturePlotConditionWhereUniqueInputObjectSchema } from './objects/AgriculturePlotConditionWhereUniqueInput.schema';
import { AgriculturePlotConditionScalarFieldEnumSchema } from './enums/AgriculturePlotConditionScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const AgriculturePlotConditionFindManySelectSchema: z.ZodType<Prisma.AgriculturePlotConditionSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    plotId: z.boolean().optional(),
    user: z.boolean().optional(),
    plot: z.boolean().optional(),
    recordedAt: z.boolean().optional(),
    temperature: z.boolean().optional(),
    moisture: z.boolean().optional(),
    ph: z.boolean().optional(),
    notes: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.AgriculturePlotConditionSelect>;

export const AgriculturePlotConditionFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    plotId: z.boolean().optional(),
    user: z.boolean().optional(),
    plot: z.boolean().optional(),
    recordedAt: z.boolean().optional(),
    temperature: z.boolean().optional(),
    moisture: z.boolean().optional(),
    ph: z.boolean().optional(),
    notes: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const AgriculturePlotConditionFindManySchema: z.ZodType<Prisma.AgriculturePlotConditionFindManyArgs> = z.object({ select: AgriculturePlotConditionFindManySelectSchema.optional(), include: z.lazy(() => AgriculturePlotConditionIncludeObjectSchema.optional()), orderBy: z.union([AgriculturePlotConditionOrderByWithRelationInputObjectSchema, AgriculturePlotConditionOrderByWithRelationInputObjectSchema.array()]).optional(), where: AgriculturePlotConditionWhereInputObjectSchema.optional(), cursor: AgriculturePlotConditionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([AgriculturePlotConditionScalarFieldEnumSchema, AgriculturePlotConditionScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.AgriculturePlotConditionFindManyArgs>;

export const AgriculturePlotConditionFindManyZodSchema = z.object({ select: AgriculturePlotConditionFindManySelectSchema.optional(), include: z.lazy(() => AgriculturePlotConditionIncludeObjectSchema.optional()), orderBy: z.union([AgriculturePlotConditionOrderByWithRelationInputObjectSchema, AgriculturePlotConditionOrderByWithRelationInputObjectSchema.array()]).optional(), where: AgriculturePlotConditionWhereInputObjectSchema.optional(), cursor: AgriculturePlotConditionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([AgriculturePlotConditionScalarFieldEnumSchema, AgriculturePlotConditionScalarFieldEnumSchema.array()]).optional() }).strict();