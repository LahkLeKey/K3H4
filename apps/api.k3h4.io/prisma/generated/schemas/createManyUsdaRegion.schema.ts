import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaRegionCreateManyInputObjectSchema as UsdaRegionCreateManyInputObjectSchema } from './objects/UsdaRegionCreateManyInput.schema';

export const UsdaRegionCreateManySchema: z.ZodType<Prisma.UsdaRegionCreateManyArgs> = z.object({ data: z.union([ UsdaRegionCreateManyInputObjectSchema, z.array(UsdaRegionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.UsdaRegionCreateManyArgs>;

export const UsdaRegionCreateManyZodSchema = z.object({ data: z.union([ UsdaRegionCreateManyInputObjectSchema, z.array(UsdaRegionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();