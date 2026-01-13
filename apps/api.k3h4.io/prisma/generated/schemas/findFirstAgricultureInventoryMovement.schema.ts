import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureInventoryMovementIncludeObjectSchema as AgricultureInventoryMovementIncludeObjectSchema } from './objects/AgricultureInventoryMovementInclude.schema';
import { AgricultureInventoryMovementOrderByWithRelationInputObjectSchema as AgricultureInventoryMovementOrderByWithRelationInputObjectSchema } from './objects/AgricultureInventoryMovementOrderByWithRelationInput.schema';
import { AgricultureInventoryMovementWhereInputObjectSchema as AgricultureInventoryMovementWhereInputObjectSchema } from './objects/AgricultureInventoryMovementWhereInput.schema';
import { AgricultureInventoryMovementWhereUniqueInputObjectSchema as AgricultureInventoryMovementWhereUniqueInputObjectSchema } from './objects/AgricultureInventoryMovementWhereUniqueInput.schema';
import { AgricultureInventoryMovementScalarFieldEnumSchema } from './enums/AgricultureInventoryMovementScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const AgricultureInventoryMovementFindFirstSelectSchema: z.ZodType<Prisma.AgricultureInventoryMovementSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    inventoryId: z.boolean().optional(),
    inventory: z.boolean().optional(),
    shipmentId: z.boolean().optional(),
    shipment: z.boolean().optional(),
    type: z.boolean().optional(),
    quantity: z.boolean().optional(),
    reason: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementSelect>;

export const AgricultureInventoryMovementFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    inventoryId: z.boolean().optional(),
    inventory: z.boolean().optional(),
    shipmentId: z.boolean().optional(),
    shipment: z.boolean().optional(),
    type: z.boolean().optional(),
    quantity: z.boolean().optional(),
    reason: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const AgricultureInventoryMovementFindFirstSchema: z.ZodType<Prisma.AgricultureInventoryMovementFindFirstArgs> = z.object({ select: AgricultureInventoryMovementFindFirstSelectSchema.optional(), include: z.lazy(() => AgricultureInventoryMovementIncludeObjectSchema.optional()), orderBy: z.union([AgricultureInventoryMovementOrderByWithRelationInputObjectSchema, AgricultureInventoryMovementOrderByWithRelationInputObjectSchema.array()]).optional(), where: AgricultureInventoryMovementWhereInputObjectSchema.optional(), cursor: AgricultureInventoryMovementWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([AgricultureInventoryMovementScalarFieldEnumSchema, AgricultureInventoryMovementScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementFindFirstArgs>;

export const AgricultureInventoryMovementFindFirstZodSchema = z.object({ select: AgricultureInventoryMovementFindFirstSelectSchema.optional(), include: z.lazy(() => AgricultureInventoryMovementIncludeObjectSchema.optional()), orderBy: z.union([AgricultureInventoryMovementOrderByWithRelationInputObjectSchema, AgricultureInventoryMovementOrderByWithRelationInputObjectSchema.array()]).optional(), where: AgricultureInventoryMovementWhereInputObjectSchema.optional(), cursor: AgricultureInventoryMovementWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([AgricultureInventoryMovementScalarFieldEnumSchema, AgricultureInventoryMovementScalarFieldEnumSchema.array()]).optional() }).strict();