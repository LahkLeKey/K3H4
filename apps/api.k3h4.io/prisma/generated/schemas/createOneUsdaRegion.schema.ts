import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaRegionSelectObjectSchema as UsdaRegionSelectObjectSchema } from './objects/UsdaRegionSelect.schema';
import { UsdaRegionCreateInputObjectSchema as UsdaRegionCreateInputObjectSchema } from './objects/UsdaRegionCreateInput.schema';
import { UsdaRegionUncheckedCreateInputObjectSchema as UsdaRegionUncheckedCreateInputObjectSchema } from './objects/UsdaRegionUncheckedCreateInput.schema';

export const UsdaRegionCreateOneSchema: z.ZodType<Prisma.UsdaRegionCreateArgs> = z.object({ select: UsdaRegionSelectObjectSchema.optional(),  data: z.union([UsdaRegionCreateInputObjectSchema, UsdaRegionUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.UsdaRegionCreateArgs>;

export const UsdaRegionCreateOneZodSchema = z.object({ select: UsdaRegionSelectObjectSchema.optional(),  data: z.union([UsdaRegionCreateInputObjectSchema, UsdaRegionUncheckedCreateInputObjectSchema]) }).strict();