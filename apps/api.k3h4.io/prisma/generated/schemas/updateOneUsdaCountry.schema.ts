import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCountrySelectObjectSchema as UsdaCountrySelectObjectSchema } from './objects/UsdaCountrySelect.schema';
import { UsdaCountryUpdateInputObjectSchema as UsdaCountryUpdateInputObjectSchema } from './objects/UsdaCountryUpdateInput.schema';
import { UsdaCountryUncheckedUpdateInputObjectSchema as UsdaCountryUncheckedUpdateInputObjectSchema } from './objects/UsdaCountryUncheckedUpdateInput.schema';
import { UsdaCountryWhereUniqueInputObjectSchema as UsdaCountryWhereUniqueInputObjectSchema } from './objects/UsdaCountryWhereUniqueInput.schema';

export const UsdaCountryUpdateOneSchema: z.ZodType<Prisma.UsdaCountryUpdateArgs> = z.object({ select: UsdaCountrySelectObjectSchema.optional(),  data: z.union([UsdaCountryUpdateInputObjectSchema, UsdaCountryUncheckedUpdateInputObjectSchema]), where: UsdaCountryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.UsdaCountryUpdateArgs>;

export const UsdaCountryUpdateOneZodSchema = z.object({ select: UsdaCountrySelectObjectSchema.optional(),  data: z.union([UsdaCountryUpdateInputObjectSchema, UsdaCountryUncheckedUpdateInputObjectSchema]), where: UsdaCountryWhereUniqueInputObjectSchema }).strict();