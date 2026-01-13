import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaUnitSelectObjectSchema as UsdaUnitSelectObjectSchema } from './objects/UsdaUnitSelect.schema';
import { UsdaUnitCreateInputObjectSchema as UsdaUnitCreateInputObjectSchema } from './objects/UsdaUnitCreateInput.schema';
import { UsdaUnitUncheckedCreateInputObjectSchema as UsdaUnitUncheckedCreateInputObjectSchema } from './objects/UsdaUnitUncheckedCreateInput.schema';

export const UsdaUnitCreateOneSchema: z.ZodType<Prisma.UsdaUnitCreateArgs> = z.object({ select: UsdaUnitSelectObjectSchema.optional(),  data: z.union([UsdaUnitCreateInputObjectSchema, UsdaUnitUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.UsdaUnitCreateArgs>;

export const UsdaUnitCreateOneZodSchema = z.object({ select: UsdaUnitSelectObjectSchema.optional(),  data: z.union([UsdaUnitCreateInputObjectSchema, UsdaUnitUncheckedCreateInputObjectSchema]) }).strict();