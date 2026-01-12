import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaUnitCreateManyInputObjectSchema as UsdaUnitCreateManyInputObjectSchema } from './objects/UsdaUnitCreateManyInput.schema';

export const UsdaUnitCreateManySchema: z.ZodType<Prisma.UsdaUnitCreateManyArgs> = z.object({ data: z.union([ UsdaUnitCreateManyInputObjectSchema, z.array(UsdaUnitCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.UsdaUnitCreateManyArgs>;

export const UsdaUnitCreateManyZodSchema = z.object({ data: z.union([ UsdaUnitCreateManyInputObjectSchema, z.array(UsdaUnitCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();