import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PosTicketWhereInputObjectSchema as PosTicketWhereInputObjectSchema } from './objects/PosTicketWhereInput.schema';

export const PosTicketDeleteManySchema: z.ZodType<Prisma.PosTicketDeleteManyArgs> = z.object({ where: PosTicketWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PosTicketDeleteManyArgs>;

export const PosTicketDeleteManyZodSchema = z.object({ where: PosTicketWhereInputObjectSchema.optional() }).strict();