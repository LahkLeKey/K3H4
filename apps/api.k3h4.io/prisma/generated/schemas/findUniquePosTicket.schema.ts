import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PosTicketSelectObjectSchema as PosTicketSelectObjectSchema } from './objects/PosTicketSelect.schema';
import { PosTicketIncludeObjectSchema as PosTicketIncludeObjectSchema } from './objects/PosTicketInclude.schema';
import { PosTicketWhereUniqueInputObjectSchema as PosTicketWhereUniqueInputObjectSchema } from './objects/PosTicketWhereUniqueInput.schema';

export const PosTicketFindUniqueSchema: z.ZodType<Prisma.PosTicketFindUniqueArgs> = z.object({ select: PosTicketSelectObjectSchema.optional(), include: PosTicketIncludeObjectSchema.optional(), where: PosTicketWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PosTicketFindUniqueArgs>;

export const PosTicketFindUniqueZodSchema = z.object({ select: PosTicketSelectObjectSchema.optional(), include: PosTicketIncludeObjectSchema.optional(), where: PosTicketWhereUniqueInputObjectSchema }).strict();