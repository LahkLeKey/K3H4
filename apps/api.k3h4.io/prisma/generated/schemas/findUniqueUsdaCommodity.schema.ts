import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCommoditySelectObjectSchema as UsdaCommoditySelectObjectSchema } from './objects/UsdaCommoditySelect.schema';
import { UsdaCommodityWhereUniqueInputObjectSchema as UsdaCommodityWhereUniqueInputObjectSchema } from './objects/UsdaCommodityWhereUniqueInput.schema';

export const UsdaCommodityFindUniqueSchema: z.ZodType<Prisma.UsdaCommodityFindUniqueArgs> = z.object({ select: UsdaCommoditySelectObjectSchema.optional(),  where: UsdaCommodityWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.UsdaCommodityFindUniqueArgs>;

export const UsdaCommodityFindUniqueZodSchema = z.object({ select: UsdaCommoditySelectObjectSchema.optional(),  where: UsdaCommodityWhereUniqueInputObjectSchema }).strict();