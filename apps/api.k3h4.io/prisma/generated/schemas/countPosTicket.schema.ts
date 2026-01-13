import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PosTicketOrderByWithRelationInputObjectSchema as PosTicketOrderByWithRelationInputObjectSchema } from './objects/PosTicketOrderByWithRelationInput.schema';
import { PosTicketWhereInputObjectSchema as PosTicketWhereInputObjectSchema } from './objects/PosTicketWhereInput.schema';
import { PosTicketWhereUniqueInputObjectSchema as PosTicketWhereUniqueInputObjectSchema } from './objects/PosTicketWhereUniqueInput.schema';
import { PosTicketCountAggregateInputObjectSchema as PosTicketCountAggregateInputObjectSchema } from './objects/PosTicketCountAggregateInput.schema';

export const PosTicketCountSchema: z.ZodType<Prisma.PosTicketCountArgs> = z.object({ orderBy: z.union([PosTicketOrderByWithRelationInputObjectSchema, PosTicketOrderByWithRelationInputObjectSchema.array()]).optional(), where: PosTicketWhereInputObjectSchema.optional(), cursor: PosTicketWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), PosTicketCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.PosTicketCountArgs>;

export const PosTicketCountZodSchema = z.object({ orderBy: z.union([PosTicketOrderByWithRelationInputObjectSchema, PosTicketOrderByWithRelationInputObjectSchema.array()]).optional(), where: PosTicketWhereInputObjectSchema.optional(), cursor: PosTicketWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), PosTicketCountAggregateInputObjectSchema ]).optional() }).strict();