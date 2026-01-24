import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCommodityAttributeWhereInputObjectSchema as UsdaCommodityAttributeWhereInputObjectSchema } from './objects/UsdaCommodityAttributeWhereInput.schema';

export const UsdaCommodityAttributeDeleteManySchema: z.ZodType<Prisma.UsdaCommodityAttributeDeleteManyArgs> = z.object({ where: UsdaCommodityAttributeWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.UsdaCommodityAttributeDeleteManyArgs>;

export const UsdaCommodityAttributeDeleteManyZodSchema = z.object({ where: UsdaCommodityAttributeWhereInputObjectSchema.optional() }).strict();