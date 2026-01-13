import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCountrySelectObjectSchema as UsdaCountrySelectObjectSchema } from './objects/UsdaCountrySelect.schema';
import { UsdaCountryWhereUniqueInputObjectSchema as UsdaCountryWhereUniqueInputObjectSchema } from './objects/UsdaCountryWhereUniqueInput.schema';

export const UsdaCountryDeleteOneSchema: z.ZodType<Prisma.UsdaCountryDeleteArgs> = z.object({ select: UsdaCountrySelectObjectSchema.optional(),  where: UsdaCountryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.UsdaCountryDeleteArgs>;

export const UsdaCountryDeleteOneZodSchema = z.object({ select: UsdaCountrySelectObjectSchema.optional(),  where: UsdaCountryWhereUniqueInputObjectSchema }).strict();