import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CulinaryPrepTaskWhereInputObjectSchema as CulinaryPrepTaskWhereInputObjectSchema } from './objects/CulinaryPrepTaskWhereInput.schema';

export const CulinaryPrepTaskDeleteManySchema: z.ZodType<Prisma.CulinaryPrepTaskDeleteManyArgs> = z.object({ where: CulinaryPrepTaskWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CulinaryPrepTaskDeleteManyArgs>;

export const CulinaryPrepTaskDeleteManyZodSchema = z.object({ where: CulinaryPrepTaskWhereInputObjectSchema.optional() }).strict();