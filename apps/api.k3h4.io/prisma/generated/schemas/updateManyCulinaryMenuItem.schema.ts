import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CulinaryMenuItemUpdateManyMutationInputObjectSchema as CulinaryMenuItemUpdateManyMutationInputObjectSchema } from './objects/CulinaryMenuItemUpdateManyMutationInput.schema';
import { CulinaryMenuItemWhereInputObjectSchema as CulinaryMenuItemWhereInputObjectSchema } from './objects/CulinaryMenuItemWhereInput.schema';

export const CulinaryMenuItemUpdateManySchema: z.ZodType<Prisma.CulinaryMenuItemUpdateManyArgs> = z.object({ data: CulinaryMenuItemUpdateManyMutationInputObjectSchema, where: CulinaryMenuItemWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CulinaryMenuItemUpdateManyArgs>;

export const CulinaryMenuItemUpdateManyZodSchema = z.object({ data: CulinaryMenuItemUpdateManyMutationInputObjectSchema, where: CulinaryMenuItemWhereInputObjectSchema.optional() }).strict();