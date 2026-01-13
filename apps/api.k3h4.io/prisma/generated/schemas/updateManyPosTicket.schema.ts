import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PosTicketUpdateManyMutationInputObjectSchema as PosTicketUpdateManyMutationInputObjectSchema } from './objects/PosTicketUpdateManyMutationInput.schema';
import { PosTicketWhereInputObjectSchema as PosTicketWhereInputObjectSchema } from './objects/PosTicketWhereInput.schema';

export const PosTicketUpdateManySchema: z.ZodType<Prisma.PosTicketUpdateManyArgs> = z.object({ data: PosTicketUpdateManyMutationInputObjectSchema, where: PosTicketWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PosTicketUpdateManyArgs>;

export const PosTicketUpdateManyZodSchema = z.object({ data: PosTicketUpdateManyMutationInputObjectSchema, where: PosTicketWhereInputObjectSchema.optional() }).strict();