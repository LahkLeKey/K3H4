import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PosStoreSelectObjectSchema as PosStoreSelectObjectSchema } from './objects/PosStoreSelect.schema';
import { PosStoreUpdateManyMutationInputObjectSchema as PosStoreUpdateManyMutationInputObjectSchema } from './objects/PosStoreUpdateManyMutationInput.schema';
import { PosStoreWhereInputObjectSchema as PosStoreWhereInputObjectSchema } from './objects/PosStoreWhereInput.schema';

export const PosStoreUpdateManyAndReturnSchema: z.ZodType<Prisma.PosStoreUpdateManyAndReturnArgs> = z.object({ select: PosStoreSelectObjectSchema.optional(), data: PosStoreUpdateManyMutationInputObjectSchema, where: PosStoreWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PosStoreUpdateManyAndReturnArgs>;

export const PosStoreUpdateManyAndReturnZodSchema = z.object({ select: PosStoreSelectObjectSchema.optional(), data: PosStoreUpdateManyMutationInputObjectSchema, where: PosStoreWhereInputObjectSchema.optional() }).strict();