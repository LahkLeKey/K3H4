import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CulinaryMenuItemSelectObjectSchema as CulinaryMenuItemSelectObjectSchema } from './objects/CulinaryMenuItemSelect.schema';
import { CulinaryMenuItemIncludeObjectSchema as CulinaryMenuItemIncludeObjectSchema } from './objects/CulinaryMenuItemInclude.schema';
import { CulinaryMenuItemWhereUniqueInputObjectSchema as CulinaryMenuItemWhereUniqueInputObjectSchema } from './objects/CulinaryMenuItemWhereUniqueInput.schema';

export const CulinaryMenuItemFindUniqueSchema: z.ZodType<Prisma.CulinaryMenuItemFindUniqueArgs> = z.object({ select: CulinaryMenuItemSelectObjectSchema.optional(), include: CulinaryMenuItemIncludeObjectSchema.optional(), where: CulinaryMenuItemWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CulinaryMenuItemFindUniqueArgs>;

export const CulinaryMenuItemFindUniqueZodSchema = z.object({ select: CulinaryMenuItemSelectObjectSchema.optional(), include: CulinaryMenuItemIncludeObjectSchema.optional(), where: CulinaryMenuItemWhereUniqueInputObjectSchema }).strict();