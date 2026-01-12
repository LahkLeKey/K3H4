import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureSlotIncludeObjectSchema as AgricultureSlotIncludeObjectSchema } from './objects/AgricultureSlotInclude.schema';
import { AgricultureSlotOrderByWithRelationInputObjectSchema as AgricultureSlotOrderByWithRelationInputObjectSchema } from './objects/AgricultureSlotOrderByWithRelationInput.schema';
import { AgricultureSlotWhereInputObjectSchema as AgricultureSlotWhereInputObjectSchema } from './objects/AgricultureSlotWhereInput.schema';
import { AgricultureSlotWhereUniqueInputObjectSchema as AgricultureSlotWhereUniqueInputObjectSchema } from './objects/AgricultureSlotWhereUniqueInput.schema';
import { AgricultureSlotScalarFieldEnumSchema } from './enums/AgricultureSlotScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const AgricultureSlotFindFirstOrThrowSelectSchema: z.ZodType<Prisma.AgricultureSlotSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    slotIndex: z.boolean().optional(),
    unlockedAt: z.boolean().optional(),
    costPaid: z.boolean().optional(),
    plotId: z.boolean().optional(),
    plot: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.AgricultureSlotSelect>;

export const AgricultureSlotFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    slotIndex: z.boolean().optional(),
    unlockedAt: z.boolean().optional(),
    costPaid: z.boolean().optional(),
    plotId: z.boolean().optional(),
    plot: z.boolean().optional()
  }).strict();

export const AgricultureSlotFindFirstOrThrowSchema: z.ZodType<Prisma.AgricultureSlotFindFirstOrThrowArgs> = z.object({ select: AgricultureSlotFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => AgricultureSlotIncludeObjectSchema.optional()), orderBy: z.union([AgricultureSlotOrderByWithRelationInputObjectSchema, AgricultureSlotOrderByWithRelationInputObjectSchema.array()]).optional(), where: AgricultureSlotWhereInputObjectSchema.optional(), cursor: AgricultureSlotWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([AgricultureSlotScalarFieldEnumSchema, AgricultureSlotScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureSlotFindFirstOrThrowArgs>;

export const AgricultureSlotFindFirstOrThrowZodSchema = z.object({ select: AgricultureSlotFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => AgricultureSlotIncludeObjectSchema.optional()), orderBy: z.union([AgricultureSlotOrderByWithRelationInputObjectSchema, AgricultureSlotOrderByWithRelationInputObjectSchema.array()]).optional(), where: AgricultureSlotWhereInputObjectSchema.optional(), cursor: AgricultureSlotWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([AgricultureSlotScalarFieldEnumSchema, AgricultureSlotScalarFieldEnumSchema.array()]).optional() }).strict();