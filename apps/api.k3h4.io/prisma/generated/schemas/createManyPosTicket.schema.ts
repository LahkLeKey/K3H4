import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PosTicketCreateManyInputObjectSchema as PosTicketCreateManyInputObjectSchema } from './objects/PosTicketCreateManyInput.schema';

export const PosTicketCreateManySchema: z.ZodType<Prisma.PosTicketCreateManyArgs> = z.object({ data: z.union([ PosTicketCreateManyInputObjectSchema, z.array(PosTicketCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.PosTicketCreateManyArgs>;

export const PosTicketCreateManyZodSchema = z.object({ data: z.union([ PosTicketCreateManyInputObjectSchema, z.array(PosTicketCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();