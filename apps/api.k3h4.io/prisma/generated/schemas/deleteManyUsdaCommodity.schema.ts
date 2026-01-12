import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCommodityWhereInputObjectSchema as UsdaCommodityWhereInputObjectSchema } from './objects/UsdaCommodityWhereInput.schema';

export const UsdaCommodityDeleteManySchema: z.ZodType<Prisma.UsdaCommodityDeleteManyArgs> = z.object({ where: UsdaCommodityWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.UsdaCommodityDeleteManyArgs>;

export const UsdaCommodityDeleteManyZodSchema = z.object({ where: UsdaCommodityWhereInputObjectSchema.optional() }).strict();