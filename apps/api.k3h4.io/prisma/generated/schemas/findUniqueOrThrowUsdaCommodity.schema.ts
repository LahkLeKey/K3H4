import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCommoditySelectObjectSchema as UsdaCommoditySelectObjectSchema } from './objects/UsdaCommoditySelect.schema';
import { UsdaCommodityWhereUniqueInputObjectSchema as UsdaCommodityWhereUniqueInputObjectSchema } from './objects/UsdaCommodityWhereUniqueInput.schema';

export const UsdaCommodityFindUniqueOrThrowSchema: z.ZodType<Prisma.UsdaCommodityFindUniqueOrThrowArgs> = z.object({ select: UsdaCommoditySelectObjectSchema.optional(),  where: UsdaCommodityWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.UsdaCommodityFindUniqueOrThrowArgs>;

export const UsdaCommodityFindUniqueOrThrowZodSchema = z.object({ select: UsdaCommoditySelectObjectSchema.optional(),  where: UsdaCommodityWhereUniqueInputObjectSchema }).strict();