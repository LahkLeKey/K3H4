import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCommodityAttributeSelectObjectSchema as UsdaCommodityAttributeSelectObjectSchema } from './objects/UsdaCommodityAttributeSelect.schema';
import { UsdaCommodityAttributeCreateManyInputObjectSchema as UsdaCommodityAttributeCreateManyInputObjectSchema } from './objects/UsdaCommodityAttributeCreateManyInput.schema';

export const UsdaCommodityAttributeCreateManyAndReturnSchema: z.ZodType<Prisma.UsdaCommodityAttributeCreateManyAndReturnArgs> = z.object({ select: UsdaCommodityAttributeSelectObjectSchema.optional(), data: z.union([ UsdaCommodityAttributeCreateManyInputObjectSchema, z.array(UsdaCommodityAttributeCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.UsdaCommodityAttributeCreateManyAndReturnArgs>;

export const UsdaCommodityAttributeCreateManyAndReturnZodSchema = z.object({ select: UsdaCommodityAttributeSelectObjectSchema.optional(), data: z.union([ UsdaCommodityAttributeCreateManyInputObjectSchema, z.array(UsdaCommodityAttributeCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();