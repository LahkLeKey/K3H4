import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgriculturePlotConditionIncludeObjectSchema as AgriculturePlotConditionIncludeObjectSchema } from './objects/AgriculturePlotConditionInclude.schema';
import { AgriculturePlotConditionOrderByWithRelationInputObjectSchema as AgriculturePlotConditionOrderByWithRelationInputObjectSchema } from './objects/AgriculturePlotConditionOrderByWithRelationInput.schema';
import { AgriculturePlotConditionWhereInputObjectSchema as AgriculturePlotConditionWhereInputObjectSchema } from './objects/AgriculturePlotConditionWhereInput.schema';
import { AgriculturePlotConditionWhereUniqueInputObjectSchema as AgriculturePlotConditionWhereUniqueInputObjectSchema } from './objects/AgriculturePlotConditionWhereUniqueInput.schema';
import { AgriculturePlotConditionScalarFieldEnumSchema } from './enums/AgriculturePlotConditionScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const AgriculturePlotConditionFindFirstOrThrowSelectSchema: z.ZodType<Prisma.AgriculturePlotConditionSelect> = z.object({
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

export const AgriculturePlotConditionFindFirstOrThrowSelectZodSchema = z.object({
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

export const AgriculturePlotConditionFindFirstOrThrowSchema: z.ZodType<Prisma.AgriculturePlotConditionFindFirstOrThrowArgs> = z.object({ select: AgriculturePlotConditionFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => AgriculturePlotConditionIncludeObjectSchema.optional()), orderBy: z.union([AgriculturePlotConditionOrderByWithRelationInputObjectSchema, AgriculturePlotConditionOrderByWithRelationInputObjectSchema.array()]).optional(), where: AgriculturePlotConditionWhereInputObjectSchema.optional(), cursor: AgriculturePlotConditionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([AgriculturePlotConditionScalarFieldEnumSchema, AgriculturePlotConditionScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.AgriculturePlotConditionFindFirstOrThrowArgs>;

export const AgriculturePlotConditionFindFirstOrThrowZodSchema = z.object({ select: AgriculturePlotConditionFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => AgriculturePlotConditionIncludeObjectSchema.optional()), orderBy: z.union([AgriculturePlotConditionOrderByWithRelationInputObjectSchema, AgriculturePlotConditionOrderByWithRelationInputObjectSchema.array()]).optional(), where: AgriculturePlotConditionWhereInputObjectSchema.optional(), cursor: AgriculturePlotConditionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([AgriculturePlotConditionScalarFieldEnumSchema, AgriculturePlotConditionScalarFieldEnumSchema.array()]).optional() }).strict();