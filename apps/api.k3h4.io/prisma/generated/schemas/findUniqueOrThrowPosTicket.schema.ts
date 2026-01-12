import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PosTicketSelectObjectSchema as PosTicketSelectObjectSchema } from './objects/PosTicketSelect.schema';
import { PosTicketIncludeObjectSchema as PosTicketIncludeObjectSchema } from './objects/PosTicketInclude.schema';
import { PosTicketWhereUniqueInputObjectSchema as PosTicketWhereUniqueInputObjectSchema } from './objects/PosTicketWhereUniqueInput.schema';

export const PosTicketFindUniqueOrThrowSchema: z.ZodType<Prisma.PosTicketFindUniqueOrThrowArgs> = z.object({ select: PosTicketSelectObjectSchema.optional(), include: PosTicketIncludeObjectSchema.optional(), where: PosTicketWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PosTicketFindUniqueOrThrowArgs>;

export const PosTicketFindUniqueOrThrowZodSchema = z.object({ select: PosTicketSelectObjectSchema.optional(), include: PosTicketIncludeObjectSchema.optional(), where: PosTicketWhereUniqueInputObjectSchema }).strict();