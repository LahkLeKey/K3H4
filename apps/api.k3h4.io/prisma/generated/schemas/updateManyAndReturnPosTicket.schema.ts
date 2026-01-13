import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PosTicketSelectObjectSchema as PosTicketSelectObjectSchema } from './objects/PosTicketSelect.schema';
import { PosTicketUpdateManyMutationInputObjectSchema as PosTicketUpdateManyMutationInputObjectSchema } from './objects/PosTicketUpdateManyMutationInput.schema';
import { PosTicketWhereInputObjectSchema as PosTicketWhereInputObjectSchema } from './objects/PosTicketWhereInput.schema';

export const PosTicketUpdateManyAndReturnSchema: z.ZodType<Prisma.PosTicketUpdateManyAndReturnArgs> = z.object({ select: PosTicketSelectObjectSchema.optional(), data: PosTicketUpdateManyMutationInputObjectSchema, where: PosTicketWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PosTicketUpdateManyAndReturnArgs>;

export const PosTicketUpdateManyAndReturnZodSchema = z.object({ select: PosTicketSelectObjectSchema.optional(), data: PosTicketUpdateManyMutationInputObjectSchema, where: PosTicketWhereInputObjectSchema.optional() }).strict();