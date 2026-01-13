import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CulinaryMenuItemSelectObjectSchema as CulinaryMenuItemSelectObjectSchema } from './objects/CulinaryMenuItemSelect.schema';
import { CulinaryMenuItemIncludeObjectSchema as CulinaryMenuItemIncludeObjectSchema } from './objects/CulinaryMenuItemInclude.schema';
import { CulinaryMenuItemUpdateInputObjectSchema as CulinaryMenuItemUpdateInputObjectSchema } from './objects/CulinaryMenuItemUpdateInput.schema';
import { CulinaryMenuItemUncheckedUpdateInputObjectSchema as CulinaryMenuItemUncheckedUpdateInputObjectSchema } from './objects/CulinaryMenuItemUncheckedUpdateInput.schema';
import { CulinaryMenuItemWhereUniqueInputObjectSchema as CulinaryMenuItemWhereUniqueInputObjectSchema } from './objects/CulinaryMenuItemWhereUniqueInput.schema';

export const CulinaryMenuItemUpdateOneSchema: z.ZodType<Prisma.CulinaryMenuItemUpdateArgs> = z.object({ select: CulinaryMenuItemSelectObjectSchema.optional(), include: CulinaryMenuItemIncludeObjectSchema.optional(), data: z.union([CulinaryMenuItemUpdateInputObjectSchema, CulinaryMenuItemUncheckedUpdateInputObjectSchema]), where: CulinaryMenuItemWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CulinaryMenuItemUpdateArgs>;

export const CulinaryMenuItemUpdateOneZodSchema = z.object({ select: CulinaryMenuItemSelectObjectSchema.optional(), include: CulinaryMenuItemIncludeObjectSchema.optional(), data: z.union([CulinaryMenuItemUpdateInputObjectSchema, CulinaryMenuItemUncheckedUpdateInputObjectSchema]), where: CulinaryMenuItemWhereUniqueInputObjectSchema }).strict();