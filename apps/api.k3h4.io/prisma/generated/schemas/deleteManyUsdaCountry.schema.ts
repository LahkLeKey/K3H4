import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCountryWhereInputObjectSchema as UsdaCountryWhereInputObjectSchema } from './objects/UsdaCountryWhereInput.schema';

export const UsdaCountryDeleteManySchema: z.ZodType<Prisma.UsdaCountryDeleteManyArgs> = z.object({ where: UsdaCountryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.UsdaCountryDeleteManyArgs>;

export const UsdaCountryDeleteManyZodSchema = z.object({ where: UsdaCountryWhereInputObjectSchema.optional() }).strict();