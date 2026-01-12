import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PosTicketSelectObjectSchema as PosTicketSelectObjectSchema } from './objects/PosTicketSelect.schema';
import { PosTicketIncludeObjectSchema as PosTicketIncludeObjectSchema } from './objects/PosTicketInclude.schema';
import { PosTicketCreateInputObjectSchema as PosTicketCreateInputObjectSchema } from './objects/PosTicketCreateInput.schema';
import { PosTicketUncheckedCreateInputObjectSchema as PosTicketUncheckedCreateInputObjectSchema } from './objects/PosTicketUncheckedCreateInput.schema';

export const PosTicketCreateOneSchema: z.ZodType<Prisma.PosTicketCreateArgs> = z.object({ select: PosTicketSelectObjectSchema.optional(), include: PosTicketIncludeObjectSchema.optional(), data: z.union([PosTicketCreateInputObjectSchema, PosTicketUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.PosTicketCreateArgs>;

export const PosTicketCreateOneZodSchema = z.object({ select: PosTicketSelectObjectSchema.optional(), include: PosTicketIncludeObjectSchema.optional(), data: z.union([PosTicketCreateInputObjectSchema, PosTicketUncheckedCreateInputObjectSchema]) }).strict();