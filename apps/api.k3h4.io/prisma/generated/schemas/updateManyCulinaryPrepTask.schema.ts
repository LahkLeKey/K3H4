import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CulinaryPrepTaskUpdateManyMutationInputObjectSchema as CulinaryPrepTaskUpdateManyMutationInputObjectSchema } from './objects/CulinaryPrepTaskUpdateManyMutationInput.schema';
import { CulinaryPrepTaskWhereInputObjectSchema as CulinaryPrepTaskWhereInputObjectSchema } from './objects/CulinaryPrepTaskWhereInput.schema';

export const CulinaryPrepTaskUpdateManySchema: z.ZodType<Prisma.CulinaryPrepTaskUpdateManyArgs> = z.object({ data: CulinaryPrepTaskUpdateManyMutationInputObjectSchema, where: CulinaryPrepTaskWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CulinaryPrepTaskUpdateManyArgs>;

export const CulinaryPrepTaskUpdateManyZodSchema = z.object({ data: CulinaryPrepTaskUpdateManyMutationInputObjectSchema, where: CulinaryPrepTaskWhereInputObjectSchema.optional() }).strict();