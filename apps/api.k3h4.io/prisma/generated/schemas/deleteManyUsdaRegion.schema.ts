import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaRegionWhereInputObjectSchema as UsdaRegionWhereInputObjectSchema } from './objects/UsdaRegionWhereInput.schema';

export const UsdaRegionDeleteManySchema: z.ZodType<Prisma.UsdaRegionDeleteManyArgs> = z.object({ where: UsdaRegionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.UsdaRegionDeleteManyArgs>;

export const UsdaRegionDeleteManyZodSchema = z.object({ where: UsdaRegionWhereInputObjectSchema.optional() }).strict();