import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgriculturePlotIncludeObjectSchema as AgriculturePlotIncludeObjectSchema } from './objects/AgriculturePlotInclude.schema';
import { AgriculturePlotOrderByWithRelationInputObjectSchema as AgriculturePlotOrderByWithRelationInputObjectSchema } from './objects/AgriculturePlotOrderByWithRelationInput.schema';
import { AgriculturePlotWhereInputObjectSchema as AgriculturePlotWhereInputObjectSchema } from './objects/AgriculturePlotWhereInput.schema';
import { AgriculturePlotWhereUniqueInputObjectSchema as AgriculturePlotWhereUniqueInputObjectSchema } from './objects/AgriculturePlotWhereUniqueInput.schema';
import { AgriculturePlotScalarFieldEnumSchema } from './enums/AgriculturePlotScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const AgriculturePlotFindFirstOrThrowSelectSchema: z.ZodType<Prisma.AgriculturePlotSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    name: z.boolean().optional(),
    fieldCode: z.boolean().optional(),
    crop: z.boolean().optional(),
    stage: z.boolean().optional(),
    acres: z.boolean().optional(),
    health: z.boolean().optional(),
    soilType: z.boolean().optional(),
    irrigationZone: z.boolean().optional(),
    notes: z.boolean().optional(),
    lastConditionAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    cropPlans: z.boolean().optional(),
    conditions: z.boolean().optional(),
    tasks: z.boolean().optional(),
    slots: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.AgriculturePlotSelect>;

export const AgriculturePlotFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    name: z.boolean().optional(),
    fieldCode: z.boolean().optional(),
    crop: z.boolean().optional(),
    stage: z.boolean().optional(),
    acres: z.boolean().optional(),
    health: z.boolean().optional(),
    soilType: z.boolean().optional(),
    irrigationZone: z.boolean().optional(),
    notes: z.boolean().optional(),
    lastConditionAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    cropPlans: z.boolean().optional(),
    conditions: z.boolean().optional(),
    tasks: z.boolean().optional(),
    slots: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const AgriculturePlotFindFirstOrThrowSchema: z.ZodType<Prisma.AgriculturePlotFindFirstOrThrowArgs> = z.object({ select: AgriculturePlotFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => AgriculturePlotIncludeObjectSchema.optional()), orderBy: z.union([AgriculturePlotOrderByWithRelationInputObjectSchema, AgriculturePlotOrderByWithRelationInputObjectSchema.array()]).optional(), where: AgriculturePlotWhereInputObjectSchema.optional(), cursor: AgriculturePlotWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([AgriculturePlotScalarFieldEnumSchema, AgriculturePlotScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.AgriculturePlotFindFirstOrThrowArgs>;

export const AgriculturePlotFindFirstOrThrowZodSchema = z.object({ select: AgriculturePlotFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => AgriculturePlotIncludeObjectSchema.optional()), orderBy: z.union([AgriculturePlotOrderByWithRelationInputObjectSchema, AgriculturePlotOrderByWithRelationInputObjectSchema.array()]).optional(), where: AgriculturePlotWhereInputObjectSchema.optional(), cursor: AgriculturePlotWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([AgriculturePlotScalarFieldEnumSchema, AgriculturePlotScalarFieldEnumSchema.array()]).optional() }).strict();