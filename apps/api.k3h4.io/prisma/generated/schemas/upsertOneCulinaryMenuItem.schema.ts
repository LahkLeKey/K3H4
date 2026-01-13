import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CulinaryMenuItemSelectObjectSchema as CulinaryMenuItemSelectObjectSchema } from './objects/CulinaryMenuItemSelect.schema';
import { CulinaryMenuItemIncludeObjectSchema as CulinaryMenuItemIncludeObjectSchema } from './objects/CulinaryMenuItemInclude.schema';
import { CulinaryMenuItemWhereUniqueInputObjectSchema as CulinaryMenuItemWhereUniqueInputObjectSchema } from './objects/CulinaryMenuItemWhereUniqueInput.schema';
import { CulinaryMenuItemCreateInputObjectSchema as CulinaryMenuItemCreateInputObjectSchema } from './objects/CulinaryMenuItemCreateInput.schema';
import { CulinaryMenuItemUncheckedCreateInputObjectSchema as CulinaryMenuItemUncheckedCreateInputObjectSchema } from './objects/CulinaryMenuItemUncheckedCreateInput.schema';
import { CulinaryMenuItemUpdateInputObjectSchema as CulinaryMenuItemUpdateInputObjectSchema } from './objects/CulinaryMenuItemUpdateInput.schema';
import { CulinaryMenuItemUncheckedUpdateInputObjectSchema as CulinaryMenuItemUncheckedUpdateInputObjectSchema } from './objects/CulinaryMenuItemUncheckedUpdateInput.schema';

export const CulinaryMenuItemUpsertOneSchema: z.ZodType<Prisma.CulinaryMenuItemUpsertArgs> = z.object({ select: CulinaryMenuItemSelectObjectSchema.optional(), include: CulinaryMenuItemIncludeObjectSchema.optional(), where: CulinaryMenuItemWhereUniqueInputObjectSchema, create: z.union([ CulinaryMenuItemCreateInputObjectSchema, CulinaryMenuItemUncheckedCreateInputObjectSchema ]), update: z.union([ CulinaryMenuItemUpdateInputObjectSchema, CulinaryMenuItemUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.CulinaryMenuItemUpsertArgs>;

export const CulinaryMenuItemUpsertOneZodSchema = z.object({ select: CulinaryMenuItemSelectObjectSchema.optional(), include: CulinaryMenuItemIncludeObjectSchema.optional(), where: CulinaryMenuItemWhereUniqueInputObjectSchema, create: z.union([ CulinaryMenuItemCreateInputObjectSchema, CulinaryMenuItemUncheckedCreateInputObjectSchema ]), update: z.union([ CulinaryMenuItemUpdateInputObjectSchema, CulinaryMenuItemUncheckedUpdateInputObjectSchema ]) }).strict();