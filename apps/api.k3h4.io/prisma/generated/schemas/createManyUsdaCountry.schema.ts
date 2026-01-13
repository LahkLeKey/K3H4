import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCountryCreateManyInputObjectSchema as UsdaCountryCreateManyInputObjectSchema } from './objects/UsdaCountryCreateManyInput.schema';

export const UsdaCountryCreateManySchema: z.ZodType<Prisma.UsdaCountryCreateManyArgs> = z.object({ data: z.union([ UsdaCountryCreateManyInputObjectSchema, z.array(UsdaCountryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.UsdaCountryCreateManyArgs>;

export const UsdaCountryCreateManyZodSchema = z.object({ data: z.union([ UsdaCountryCreateManyInputObjectSchema, z.array(UsdaCountryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();