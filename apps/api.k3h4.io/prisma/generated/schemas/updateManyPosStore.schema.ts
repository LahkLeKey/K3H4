import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PosStoreUpdateManyMutationInputObjectSchema as PosStoreUpdateManyMutationInputObjectSchema } from './objects/PosStoreUpdateManyMutationInput.schema';
import { PosStoreWhereInputObjectSchema as PosStoreWhereInputObjectSchema } from './objects/PosStoreWhereInput.schema';

export const PosStoreUpdateManySchema: z.ZodType<Prisma.PosStoreUpdateManyArgs> = z.object({ data: PosStoreUpdateManyMutationInputObjectSchema, where: PosStoreWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PosStoreUpdateManyArgs>;

export const PosStoreUpdateManyZodSchema = z.object({ data: PosStoreUpdateManyMutationInputObjectSchema, where: PosStoreWhereInputObjectSchema.optional() }).strict();