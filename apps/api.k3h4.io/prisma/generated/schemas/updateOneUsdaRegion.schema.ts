import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaRegionSelectObjectSchema as UsdaRegionSelectObjectSchema } from './objects/UsdaRegionSelect.schema';
import { UsdaRegionUpdateInputObjectSchema as UsdaRegionUpdateInputObjectSchema } from './objects/UsdaRegionUpdateInput.schema';
import { UsdaRegionUncheckedUpdateInputObjectSchema as UsdaRegionUncheckedUpdateInputObjectSchema } from './objects/UsdaRegionUncheckedUpdateInput.schema';
import { UsdaRegionWhereUniqueInputObjectSchema as UsdaRegionWhereUniqueInputObjectSchema } from './objects/UsdaRegionWhereUniqueInput.schema';

export const UsdaRegionUpdateOneSchema: z.ZodType<Prisma.UsdaRegionUpdateArgs> = z.object({ select: UsdaRegionSelectObjectSchema.optional(),  data: z.union([UsdaRegionUpdateInputObjectSchema, UsdaRegionUncheckedUpdateInputObjectSchema]), where: UsdaRegionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.UsdaRegionUpdateArgs>;

export const UsdaRegionUpdateOneZodSchema = z.object({ select: UsdaRegionSelectObjectSchema.optional(),  data: z.union([UsdaRegionUpdateInputObjectSchema, UsdaRegionUncheckedUpdateInputObjectSchema]), where: UsdaRegionWhereUniqueInputObjectSchema }).strict();