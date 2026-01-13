import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCountrySelectObjectSchema as UsdaCountrySelectObjectSchema } from './objects/UsdaCountrySelect.schema';
import { UsdaCountryUpdateManyMutationInputObjectSchema as UsdaCountryUpdateManyMutationInputObjectSchema } from './objects/UsdaCountryUpdateManyMutationInput.schema';
import { UsdaCountryWhereInputObjectSchema as UsdaCountryWhereInputObjectSchema } from './objects/UsdaCountryWhereInput.schema';

export const UsdaCountryUpdateManyAndReturnSchema: z.ZodType<Prisma.UsdaCountryUpdateManyAndReturnArgs> = z.object({ select: UsdaCountrySelectObjectSchema.optional(), data: UsdaCountryUpdateManyMutationInputObjectSchema, where: UsdaCountryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.UsdaCountryUpdateManyAndReturnArgs>;

export const UsdaCountryUpdateManyAndReturnZodSchema = z.object({ select: UsdaCountrySelectObjectSchema.optional(), data: UsdaCountryUpdateManyMutationInputObjectSchema, where: UsdaCountryWhereInputObjectSchema.optional() }).strict();