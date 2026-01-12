import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PosLineItemIncludeObjectSchema as PosLineItemIncludeObjectSchema } from './objects/PosLineItemInclude.schema';
import { PosLineItemOrderByWithRelationInputObjectSchema as PosLineItemOrderByWithRelationInputObjectSchema } from './objects/PosLineItemOrderByWithRelationInput.schema';
import { PosLineItemWhereInputObjectSchema as PosLineItemWhereInputObjectSchema } from './objects/PosLineItemWhereInput.schema';
import { PosLineItemWhereUniqueInputObjectSchema as PosLineItemWhereUniqueInputObjectSchema } from './objects/PosLineItemWhereUniqueInput.schema';
import { PosLineItemScalarFieldEnumSchema } from './enums/PosLineItemScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const PosLineItemFindFirstSelectSchema: z.ZodType<Prisma.PosLineItemSelect> = z.object({
    id: z.boolean().optional(),
    ticketId: z.boolean().optional(),
    ticket: z.boolean().optional(),
    name: z.boolean().optional(),
    quantity: z.boolean().optional(),
    price: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.PosLineItemSelect>;

export const PosLineItemFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    ticketId: z.boolean().optional(),
    ticket: z.boolean().optional(),
    name: z.boolean().optional(),
    quantity: z.boolean().optional(),
    price: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict();

export const PosLineItemFindFirstSchema: z.ZodType<Prisma.PosLineItemFindFirstArgs> = z.object({ select: PosLineItemFindFirstSelectSchema.optional(), include: z.lazy(() => PosLineItemIncludeObjectSchema.optional()), orderBy: z.union([PosLineItemOrderByWithRelationInputObjectSchema, PosLineItemOrderByWithRelationInputObjectSchema.array()]).optional(), where: PosLineItemWhereInputObjectSchema.optional(), cursor: PosLineItemWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PosLineItemScalarFieldEnumSchema, PosLineItemScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.PosLineItemFindFirstArgs>;

export const PosLineItemFindFirstZodSchema = z.object({ select: PosLineItemFindFirstSelectSchema.optional(), include: z.lazy(() => PosLineItemIncludeObjectSchema.optional()), orderBy: z.union([PosLineItemOrderByWithRelationInputObjectSchema, PosLineItemOrderByWithRelationInputObjectSchema.array()]).optional(), where: PosLineItemWhereInputObjectSchema.optional(), cursor: PosLineItemWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PosLineItemScalarFieldEnumSchema, PosLineItemScalarFieldEnumSchema.array()]).optional() }).strict();