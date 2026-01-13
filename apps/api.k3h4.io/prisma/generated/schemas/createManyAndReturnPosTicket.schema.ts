import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PosTicketSelectObjectSchema as PosTicketSelectObjectSchema } from './objects/PosTicketSelect.schema';
import { PosTicketCreateManyInputObjectSchema as PosTicketCreateManyInputObjectSchema } from './objects/PosTicketCreateManyInput.schema';

export const PosTicketCreateManyAndReturnSchema: z.ZodType<Prisma.PosTicketCreateManyAndReturnArgs> = z.object({ select: PosTicketSelectObjectSchema.optional(), data: z.union([ PosTicketCreateManyInputObjectSchema, z.array(PosTicketCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.PosTicketCreateManyAndReturnArgs>;

export const PosTicketCreateManyAndReturnZodSchema = z.object({ select: PosTicketSelectObjectSchema.optional(), data: z.union([ PosTicketCreateManyInputObjectSchema, z.array(PosTicketCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();