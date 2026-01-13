import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCountrySelectObjectSchema as UsdaCountrySelectObjectSchema } from './objects/UsdaCountrySelect.schema';
import { UsdaCountryWhereUniqueInputObjectSchema as UsdaCountryWhereUniqueInputObjectSchema } from './objects/UsdaCountryWhereUniqueInput.schema';
import { UsdaCountryCreateInputObjectSchema as UsdaCountryCreateInputObjectSchema } from './objects/UsdaCountryCreateInput.schema';
import { UsdaCountryUncheckedCreateInputObjectSchema as UsdaCountryUncheckedCreateInputObjectSchema } from './objects/UsdaCountryUncheckedCreateInput.schema';
import { UsdaCountryUpdateInputObjectSchema as UsdaCountryUpdateInputObjectSchema } from './objects/UsdaCountryUpdateInput.schema';
import { UsdaCountryUncheckedUpdateInputObjectSchema as UsdaCountryUncheckedUpdateInputObjectSchema } from './objects/UsdaCountryUncheckedUpdateInput.schema';

export const UsdaCountryUpsertOneSchema: z.ZodType<Prisma.UsdaCountryUpsertArgs> = z.object({ select: UsdaCountrySelectObjectSchema.optional(),  where: UsdaCountryWhereUniqueInputObjectSchema, create: z.union([ UsdaCountryCreateInputObjectSchema, UsdaCountryUncheckedCreateInputObjectSchema ]), update: z.union([ UsdaCountryUpdateInputObjectSchema, UsdaCountryUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.UsdaCountryUpsertArgs>;

export const UsdaCountryUpsertOneZodSchema = z.object({ select: UsdaCountrySelectObjectSchema.optional(),  where: UsdaCountryWhereUniqueInputObjectSchema, create: z.union([ UsdaCountryCreateInputObjectSchema, UsdaCountryUncheckedCreateInputObjectSchema ]), update: z.union([ UsdaCountryUpdateInputObjectSchema, UsdaCountryUncheckedUpdateInputObjectSchema ]) }).strict();