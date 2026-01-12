import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaUnitSelectObjectSchema as UsdaUnitSelectObjectSchema } from './objects/UsdaUnitSelect.schema';
import { UsdaUnitCreateManyInputObjectSchema as UsdaUnitCreateManyInputObjectSchema } from './objects/UsdaUnitCreateManyInput.schema';

export const UsdaUnitCreateManyAndReturnSchema: z.ZodType<Prisma.UsdaUnitCreateManyAndReturnArgs> = z.object({ select: UsdaUnitSelectObjectSchema.optional(), data: z.union([ UsdaUnitCreateManyInputObjectSchema, z.array(UsdaUnitCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.UsdaUnitCreateManyAndReturnArgs>;

export const UsdaUnitCreateManyAndReturnZodSchema = z.object({ select: UsdaUnitSelectObjectSchema.optional(), data: z.union([ UsdaUnitCreateManyInputObjectSchema, z.array(UsdaUnitCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();