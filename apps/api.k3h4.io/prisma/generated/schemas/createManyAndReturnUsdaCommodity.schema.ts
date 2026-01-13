import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCommoditySelectObjectSchema as UsdaCommoditySelectObjectSchema } from './objects/UsdaCommoditySelect.schema';
import { UsdaCommodityCreateManyInputObjectSchema as UsdaCommodityCreateManyInputObjectSchema } from './objects/UsdaCommodityCreateManyInput.schema';

export const UsdaCommodityCreateManyAndReturnSchema: z.ZodType<Prisma.UsdaCommodityCreateManyAndReturnArgs> = z.object({ select: UsdaCommoditySelectObjectSchema.optional(), data: z.union([ UsdaCommodityCreateManyInputObjectSchema, z.array(UsdaCommodityCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.UsdaCommodityCreateManyAndReturnArgs>;

export const UsdaCommodityCreateManyAndReturnZodSchema = z.object({ select: UsdaCommoditySelectObjectSchema.optional(), data: z.union([ UsdaCommodityCreateManyInputObjectSchema, z.array(UsdaCommodityCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();