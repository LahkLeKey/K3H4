import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCommodityAttributeSelectObjectSchema as UsdaCommodityAttributeSelectObjectSchema } from './objects/UsdaCommodityAttributeSelect.schema';
import { UsdaCommodityAttributeWhereUniqueInputObjectSchema as UsdaCommodityAttributeWhereUniqueInputObjectSchema } from './objects/UsdaCommodityAttributeWhereUniqueInput.schema';

export const UsdaCommodityAttributeFindUniqueSchema: z.ZodType<Prisma.UsdaCommodityAttributeFindUniqueArgs> = z.object({ select: UsdaCommodityAttributeSelectObjectSchema.optional(),  where: UsdaCommodityAttributeWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.UsdaCommodityAttributeFindUniqueArgs>;

export const UsdaCommodityAttributeFindUniqueZodSchema = z.object({ select: UsdaCommodityAttributeSelectObjectSchema.optional(),  where: UsdaCommodityAttributeWhereUniqueInputObjectSchema }).strict();