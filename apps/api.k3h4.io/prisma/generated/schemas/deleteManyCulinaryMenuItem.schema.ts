import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CulinaryMenuItemWhereInputObjectSchema as CulinaryMenuItemWhereInputObjectSchema } from './objects/CulinaryMenuItemWhereInput.schema';

export const CulinaryMenuItemDeleteManySchema: z.ZodType<Prisma.CulinaryMenuItemDeleteManyArgs> = z.object({ where: CulinaryMenuItemWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CulinaryMenuItemDeleteManyArgs>;

export const CulinaryMenuItemDeleteManyZodSchema = z.object({ where: CulinaryMenuItemWhereInputObjectSchema.optional() }).strict();