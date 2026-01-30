import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FreightLoadSelectObjectSchema as FreightLoadSelectObjectSchema } from './objects/FreightLoadSelect.schema';
import { FreightLoadUpdateManyMutationInputObjectSchema as FreightLoadUpdateManyMutationInputObjectSchema } from './objects/FreightLoadUpdateManyMutationInput.schema';
import { FreightLoadWhereInputObjectSchema as FreightLoadWhereInputObjectSchema } from './objects/FreightLoadWhereInput.schema';

export const FreightLoadUpdateManyAndReturnSchema: z.ZodType<Prisma.FreightLoadUpdateManyAndReturnArgs> = z.object({ select: FreightLoadSelectObjectSchema.optional(), data: FreightLoadUpdateManyMutationInputObjectSchema, where: FreightLoadWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.FreightLoadUpdateManyAndReturnArgs>;

export const FreightLoadUpdateManyAndReturnZodSchema = z.object({ select: FreightLoadSelectObjectSchema.optional(), data: FreightLoadUpdateManyMutationInputObjectSchema, where: FreightLoadWhereInputObjectSchema.optional() }).strict();