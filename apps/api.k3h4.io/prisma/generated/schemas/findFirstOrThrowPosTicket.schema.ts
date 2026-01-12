import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PosTicketIncludeObjectSchema as PosTicketIncludeObjectSchema } from './objects/PosTicketInclude.schema';
import { PosTicketOrderByWithRelationInputObjectSchema as PosTicketOrderByWithRelationInputObjectSchema } from './objects/PosTicketOrderByWithRelationInput.schema';
import { PosTicketWhereInputObjectSchema as PosTicketWhereInputObjectSchema } from './objects/PosTicketWhereInput.schema';
import { PosTicketWhereUniqueInputObjectSchema as PosTicketWhereUniqueInputObjectSchema } from './objects/PosTicketWhereUniqueInput.schema';
import { PosTicketScalarFieldEnumSchema } from './enums/PosTicketScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const PosTicketFindFirstOrThrowSelectSchema: z.ZodType<Prisma.PosTicketSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    storeId: z.boolean().optional(),
    store: z.boolean().optional(),
    total: z.boolean().optional(),
    itemsCount: z.boolean().optional(),
    channel: z.boolean().optional(),
    status: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    lineItems: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.PosTicketSelect>;

export const PosTicketFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    storeId: z.boolean().optional(),
    store: z.boolean().optional(),
    total: z.boolean().optional(),
    itemsCount: z.boolean().optional(),
    channel: z.boolean().optional(),
    status: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    lineItems: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const PosTicketFindFirstOrThrowSchema: z.ZodType<Prisma.PosTicketFindFirstOrThrowArgs> = z.object({ select: PosTicketFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => PosTicketIncludeObjectSchema.optional()), orderBy: z.union([PosTicketOrderByWithRelationInputObjectSchema, PosTicketOrderByWithRelationInputObjectSchema.array()]).optional(), where: PosTicketWhereInputObjectSchema.optional(), cursor: PosTicketWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PosTicketScalarFieldEnumSchema, PosTicketScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.PosTicketFindFirstOrThrowArgs>;

export const PosTicketFindFirstOrThrowZodSchema = z.object({ select: PosTicketFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => PosTicketIncludeObjectSchema.optional()), orderBy: z.union([PosTicketOrderByWithRelationInputObjectSchema, PosTicketOrderByWithRelationInputObjectSchema.array()]).optional(), where: PosTicketWhereInputObjectSchema.optional(), cursor: PosTicketWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PosTicketScalarFieldEnumSchema, PosTicketScalarFieldEnumSchema.array()]).optional() }).strict();