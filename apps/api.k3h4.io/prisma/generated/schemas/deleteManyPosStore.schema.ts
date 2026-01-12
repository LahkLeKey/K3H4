import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PosStoreWhereInputObjectSchema as PosStoreWhereInputObjectSchema } from './objects/PosStoreWhereInput.schema';

export const PosStoreDeleteManySchema: z.ZodType<Prisma.PosStoreDeleteManyArgs> = z.object({ where: PosStoreWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PosStoreDeleteManyArgs>;

export const PosStoreDeleteManyZodSchema = z.object({ where: PosStoreWhereInputObjectSchema.optional() }).strict();