import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCountrySelectObjectSchema as UsdaCountrySelectObjectSchema } from './objects/UsdaCountrySelect.schema';
import { UsdaCountryCreateInputObjectSchema as UsdaCountryCreateInputObjectSchema } from './objects/UsdaCountryCreateInput.schema';
import { UsdaCountryUncheckedCreateInputObjectSchema as UsdaCountryUncheckedCreateInputObjectSchema } from './objects/UsdaCountryUncheckedCreateInput.schema';

export const UsdaCountryCreateOneSchema: z.ZodType<Prisma.UsdaCountryCreateArgs> = z.object({ select: UsdaCountrySelectObjectSchema.optional(),  data: z.union([UsdaCountryCreateInputObjectSchema, UsdaCountryUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.UsdaCountryCreateArgs>;

export const UsdaCountryCreateOneZodSchema = z.object({ select: UsdaCountrySelectObjectSchema.optional(),  data: z.union([UsdaCountryCreateInputObjectSchema, UsdaCountryUncheckedCreateInputObjectSchema]) }).strict();