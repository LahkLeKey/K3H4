import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCountryUpdateManyMutationInputObjectSchema as UsdaCountryUpdateManyMutationInputObjectSchema } from './objects/UsdaCountryUpdateManyMutationInput.schema';
import { UsdaCountryWhereInputObjectSchema as UsdaCountryWhereInputObjectSchema } from './objects/UsdaCountryWhereInput.schema';

export const UsdaCountryUpdateManySchema: z.ZodType<Prisma.UsdaCountryUpdateManyArgs> = z.object({ data: UsdaCountryUpdateManyMutationInputObjectSchema, where: UsdaCountryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.UsdaCountryUpdateManyArgs>;

export const UsdaCountryUpdateManyZodSchema = z.object({ data: UsdaCountryUpdateManyMutationInputObjectSchema, where: UsdaCountryWhereInputObjectSchema.optional() }).strict();