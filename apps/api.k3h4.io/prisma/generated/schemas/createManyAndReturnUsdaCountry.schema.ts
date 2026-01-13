import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCountrySelectObjectSchema as UsdaCountrySelectObjectSchema } from './objects/UsdaCountrySelect.schema';
import { UsdaCountryCreateManyInputObjectSchema as UsdaCountryCreateManyInputObjectSchema } from './objects/UsdaCountryCreateManyInput.schema';

export const UsdaCountryCreateManyAndReturnSchema: z.ZodType<Prisma.UsdaCountryCreateManyAndReturnArgs> = z.object({ select: UsdaCountrySelectObjectSchema.optional(), data: z.union([ UsdaCountryCreateManyInputObjectSchema, z.array(UsdaCountryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.UsdaCountryCreateManyAndReturnArgs>;

export const UsdaCountryCreateManyAndReturnZodSchema = z.object({ select: UsdaCountrySelectObjectSchema.optional(), data: z.union([ UsdaCountryCreateManyInputObjectSchema, z.array(UsdaCountryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();