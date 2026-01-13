import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaRegionSelectObjectSchema as UsdaRegionSelectObjectSchema } from './objects/UsdaRegionSelect.schema';
import { UsdaRegionWhereUniqueInputObjectSchema as UsdaRegionWhereUniqueInputObjectSchema } from './objects/UsdaRegionWhereUniqueInput.schema';

export const UsdaRegionDeleteOneSchema: z.ZodType<Prisma.UsdaRegionDeleteArgs> = z.object({ select: UsdaRegionSelectObjectSchema.optional(),  where: UsdaRegionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.UsdaRegionDeleteArgs>;

export const UsdaRegionDeleteOneZodSchema = z.object({ select: UsdaRegionSelectObjectSchema.optional(),  where: UsdaRegionWhereUniqueInputObjectSchema }).strict();