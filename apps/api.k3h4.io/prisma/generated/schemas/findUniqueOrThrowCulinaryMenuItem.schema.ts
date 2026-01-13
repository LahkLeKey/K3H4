import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CulinaryMenuItemSelectObjectSchema as CulinaryMenuItemSelectObjectSchema } from './objects/CulinaryMenuItemSelect.schema';
import { CulinaryMenuItemIncludeObjectSchema as CulinaryMenuItemIncludeObjectSchema } from './objects/CulinaryMenuItemInclude.schema';
import { CulinaryMenuItemWhereUniqueInputObjectSchema as CulinaryMenuItemWhereUniqueInputObjectSchema } from './objects/CulinaryMenuItemWhereUniqueInput.schema';

export const CulinaryMenuItemFindUniqueOrThrowSchema: z.ZodType<Prisma.CulinaryMenuItemFindUniqueOrThrowArgs> = z.object({ select: CulinaryMenuItemSelectObjectSchema.optional(), include: CulinaryMenuItemIncludeObjectSchema.optional(), where: CulinaryMenuItemWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CulinaryMenuItemFindUniqueOrThrowArgs>;

export const CulinaryMenuItemFindUniqueOrThrowZodSchema = z.object({ select: CulinaryMenuItemSelectObjectSchema.optional(), include: CulinaryMenuItemIncludeObjectSchema.optional(), where: CulinaryMenuItemWhereUniqueInputObjectSchema }).strict();