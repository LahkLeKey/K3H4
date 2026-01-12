import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureCropPlanIncludeObjectSchema as AgricultureCropPlanIncludeObjectSchema } from './objects/AgricultureCropPlanInclude.schema';
import { AgricultureCropPlanOrderByWithRelationInputObjectSchema as AgricultureCropPlanOrderByWithRelationInputObjectSchema } from './objects/AgricultureCropPlanOrderByWithRelationInput.schema';
import { AgricultureCropPlanWhereInputObjectSchema as AgricultureCropPlanWhereInputObjectSchema } from './objects/AgricultureCropPlanWhereInput.schema';
import { AgricultureCropPlanWhereUniqueInputObjectSchema as AgricultureCropPlanWhereUniqueInputObjectSchema } from './objects/AgricultureCropPlanWhereUniqueInput.schema';
import { AgricultureCropPlanScalarFieldEnumSchema } from './enums/AgricultureCropPlanScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const AgricultureCropPlanFindFirstOrThrowSelectSchema: z.ZodType<Prisma.AgricultureCropPlanSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    plotId: z.boolean().optional(),
    user: z.boolean().optional(),
    plot: z.boolean().optional(),
    crop: z.boolean().optional(),
    phase: z.boolean().optional(),
    status: z.boolean().optional(),
    startDate: z.boolean().optional(),
    targetHarvestDate: z.boolean().optional(),
    endDate: z.boolean().optional(),
    notes: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    tasks: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.AgricultureCropPlanSelect>;

export const AgricultureCropPlanFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    plotId: z.boolean().optional(),
    user: z.boolean().optional(),
    plot: z.boolean().optional(),
    crop: z.boolean().optional(),
    phase: z.boolean().optional(),
    status: z.boolean().optional(),
    startDate: z.boolean().optional(),
    targetHarvestDate: z.boolean().optional(),
    endDate: z.boolean().optional(),
    notes: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    tasks: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const AgricultureCropPlanFindFirstOrThrowSchema: z.ZodType<Prisma.AgricultureCropPlanFindFirstOrThrowArgs> = z.object({ select: AgricultureCropPlanFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => AgricultureCropPlanIncludeObjectSchema.optional()), orderBy: z.union([AgricultureCropPlanOrderByWithRelationInputObjectSchema, AgricultureCropPlanOrderByWithRelationInputObjectSchema.array()]).optional(), where: AgricultureCropPlanWhereInputObjectSchema.optional(), cursor: AgricultureCropPlanWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([AgricultureCropPlanScalarFieldEnumSchema, AgricultureCropPlanScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureCropPlanFindFirstOrThrowArgs>;

export const AgricultureCropPlanFindFirstOrThrowZodSchema = z.object({ select: AgricultureCropPlanFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => AgricultureCropPlanIncludeObjectSchema.optional()), orderBy: z.union([AgricultureCropPlanOrderByWithRelationInputObjectSchema, AgricultureCropPlanOrderByWithRelationInputObjectSchema.array()]).optional(), where: AgricultureCropPlanWhereInputObjectSchema.optional(), cursor: AgricultureCropPlanWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([AgricultureCropPlanScalarFieldEnumSchema, AgricultureCropPlanScalarFieldEnumSchema.array()]).optional() }).strict();