import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PosTicketSelectObjectSchema as PosTicketSelectObjectSchema } from './objects/PosTicketSelect.schema';
import { PosTicketIncludeObjectSchema as PosTicketIncludeObjectSchema } from './objects/PosTicketInclude.schema';
import { PosTicketUpdateInputObjectSchema as PosTicketUpdateInputObjectSchema } from './objects/PosTicketUpdateInput.schema';
import { PosTicketUncheckedUpdateInputObjectSchema as PosTicketUncheckedUpdateInputObjectSchema } from './objects/PosTicketUncheckedUpdateInput.schema';
import { PosTicketWhereUniqueInputObjectSchema as PosTicketWhereUniqueInputObjectSchema } from './objects/PosTicketWhereUniqueInput.schema';

export const PosTicketUpdateOneSchema: z.ZodType<Prisma.PosTicketUpdateArgs> = z.object({ select: PosTicketSelectObjectSchema.optional(), include: PosTicketIncludeObjectSchema.optional(), data: z.union([PosTicketUpdateInputObjectSchema, PosTicketUncheckedUpdateInputObjectSchema]), where: PosTicketWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PosTicketUpdateArgs>;

export const PosTicketUpdateOneZodSchema = z.object({ select: PosTicketSelectObjectSchema.optional(), include: PosTicketIncludeObjectSchema.optional(), data: z.union([PosTicketUpdateInputObjectSchema, PosTicketUncheckedUpdateInputObjectSchema]), where: PosTicketWhereUniqueInputObjectSchema }).strict();