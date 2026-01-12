import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CulinaryMenuItemSelectObjectSchema as CulinaryMenuItemSelectObjectSchema } from './objects/CulinaryMenuItemSelect.schema';
import { CulinaryMenuItemUpdateManyMutationInputObjectSchema as CulinaryMenuItemUpdateManyMutationInputObjectSchema } from './objects/CulinaryMenuItemUpdateManyMutationInput.schema';
import { CulinaryMenuItemWhereInputObjectSchema as CulinaryMenuItemWhereInputObjectSchema } from './objects/CulinaryMenuItemWhereInput.schema';

export const CulinaryMenuItemUpdateManyAndReturnSchema: z.ZodType<Prisma.CulinaryMenuItemUpdateManyAndReturnArgs> = z.object({ select: CulinaryMenuItemSelectObjectSchema.optional(), data: CulinaryMenuItemUpdateManyMutationInputObjectSchema, where: CulinaryMenuItemWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CulinaryMenuItemUpdateManyAndReturnArgs>;

export const CulinaryMenuItemUpdateManyAndReturnZodSchema = z.object({ select: CulinaryMenuItemSelectObjectSchema.optional(), data: CulinaryMenuItemUpdateManyMutationInputObjectSchema, where: CulinaryMenuItemWhereInputObjectSchema.optional() }).strict();