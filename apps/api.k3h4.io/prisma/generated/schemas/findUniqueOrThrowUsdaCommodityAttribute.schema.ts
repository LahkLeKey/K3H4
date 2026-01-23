import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCommodityAttributeSelectObjectSchema as UsdaCommodityAttributeSelectObjectSchema } from './objects/UsdaCommodityAttributeSelect.schema';
import { UsdaCommodityAttributeWhereUniqueInputObjectSchema as UsdaCommodityAttributeWhereUniqueInputObjectSchema } from './objects/UsdaCommodityAttributeWhereUniqueInput.schema';

export const UsdaCommodityAttributeFindUniqueOrThrowSchema: z.ZodType<Prisma.UsdaCommodityAttributeFindUniqueOrThrowArgs> = z.object({ select: UsdaCommodityAttributeSelectObjectSchema.optional(),  where: UsdaCommodityAttributeWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.UsdaCommodityAttributeFindUniqueOrThrowArgs>;

export const UsdaCommodityAttributeFindUniqueOrThrowZodSchema = z.object({ select: UsdaCommodityAttributeSelectObjectSchema.optional(),  where: UsdaCommodityAttributeWhereUniqueInputObjectSchema }).strict();