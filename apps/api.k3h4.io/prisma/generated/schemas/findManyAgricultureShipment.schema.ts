import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureShipmentIncludeObjectSchema as AgricultureShipmentIncludeObjectSchema } from './objects/AgricultureShipmentInclude.schema';
import { AgricultureShipmentOrderByWithRelationInputObjectSchema as AgricultureShipmentOrderByWithRelationInputObjectSchema } from './objects/AgricultureShipmentOrderByWithRelationInput.schema';
import { AgricultureShipmentWhereInputObjectSchema as AgricultureShipmentWhereInputObjectSchema } from './objects/AgricultureShipmentWhereInput.schema';
import { AgricultureShipmentWhereUniqueInputObjectSchema as AgricultureShipmentWhereUniqueInputObjectSchema } from './objects/AgricultureShipmentWhereUniqueInput.schema';
import { AgricultureShipmentScalarFieldEnumSchema } from './enums/AgricultureShipmentScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const AgricultureShipmentFindManySelectSchema: z.ZodType<Prisma.AgricultureShipmentSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    lot: z.boolean().optional(),
    destination: z.boolean().optional(),
    mode: z.boolean().optional(),
    eta: z.boolean().optional(),
    freightLoadId: z.boolean().optional(),
    freightLoad: z.boolean().optional(),
    inventoryMovements: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.AgricultureShipmentSelect>;

export const AgricultureShipmentFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    lot: z.boolean().optional(),
    destination: z.boolean().optional(),
    mode: z.boolean().optional(),
    eta: z.boolean().optional(),
    freightLoadId: z.boolean().optional(),
    freightLoad: z.boolean().optional(),
    inventoryMovements: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const AgricultureShipmentFindManySchema: z.ZodType<Prisma.AgricultureShipmentFindManyArgs> = z.object({ select: AgricultureShipmentFindManySelectSchema.optional(), include: z.lazy(() => AgricultureShipmentIncludeObjectSchema.optional()), orderBy: z.union([AgricultureShipmentOrderByWithRelationInputObjectSchema, AgricultureShipmentOrderByWithRelationInputObjectSchema.array()]).optional(), where: AgricultureShipmentWhereInputObjectSchema.optional(), cursor: AgricultureShipmentWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([AgricultureShipmentScalarFieldEnumSchema, AgricultureShipmentScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureShipmentFindManyArgs>;

export const AgricultureShipmentFindManyZodSchema = z.object({ select: AgricultureShipmentFindManySelectSchema.optional(), include: z.lazy(() => AgricultureShipmentIncludeObjectSchema.optional()), orderBy: z.union([AgricultureShipmentOrderByWithRelationInputObjectSchema, AgricultureShipmentOrderByWithRelationInputObjectSchema.array()]).optional(), where: AgricultureShipmentWhereInputObjectSchema.optional(), cursor: AgricultureShipmentWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([AgricultureShipmentScalarFieldEnumSchema, AgricultureShipmentScalarFieldEnumSchema.array()]).optional() }).strict();