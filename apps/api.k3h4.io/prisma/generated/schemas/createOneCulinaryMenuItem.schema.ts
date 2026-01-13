import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CulinaryMenuItemSelectObjectSchema as CulinaryMenuItemSelectObjectSchema } from './objects/CulinaryMenuItemSelect.schema';
import { CulinaryMenuItemIncludeObjectSchema as CulinaryMenuItemIncludeObjectSchema } from './objects/CulinaryMenuItemInclude.schema';
import { CulinaryMenuItemCreateInputObjectSchema as CulinaryMenuItemCreateInputObjectSchema } from './objects/CulinaryMenuItemCreateInput.schema';
import { CulinaryMenuItemUncheckedCreateInputObjectSchema as CulinaryMenuItemUncheckedCreateInputObjectSchema } from './objects/CulinaryMenuItemUncheckedCreateInput.schema';

export const CulinaryMenuItemCreateOneSchema: z.ZodType<Prisma.CulinaryMenuItemCreateArgs> = z.object({ select: CulinaryMenuItemSelectObjectSchema.optional(), include: CulinaryMenuItemIncludeObjectSchema.optional(), data: z.union([CulinaryMenuItemCreateInputObjectSchema, CulinaryMenuItemUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.CulinaryMenuItemCreateArgs>;

export const CulinaryMenuItemCreateOneZodSchema = z.object({ select: CulinaryMenuItemSelectObjectSchema.optional(), include: CulinaryMenuItemIncludeObjectSchema.optional(), data: z.union([CulinaryMenuItemCreateInputObjectSchema, CulinaryMenuItemUncheckedCreateInputObjectSchema]) }).strict();