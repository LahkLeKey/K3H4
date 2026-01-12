import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaRegionSelectObjectSchema as UsdaRegionSelectObjectSchema } from './objects/UsdaRegionSelect.schema';
import { UsdaRegionCreateManyInputObjectSchema as UsdaRegionCreateManyInputObjectSchema } from './objects/UsdaRegionCreateManyInput.schema';

export const UsdaRegionCreateManyAndReturnSchema: z.ZodType<Prisma.UsdaRegionCreateManyAndReturnArgs> = z.object({ select: UsdaRegionSelectObjectSchema.optional(), data: z.union([ UsdaRegionCreateManyInputObjectSchema, z.array(UsdaRegionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.UsdaRegionCreateManyAndReturnArgs>;

export const UsdaRegionCreateManyAndReturnZodSchema = z.object({ select: UsdaRegionSelectObjectSchema.optional(), data: z.union([ UsdaRegionCreateManyInputObjectSchema, z.array(UsdaRegionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();