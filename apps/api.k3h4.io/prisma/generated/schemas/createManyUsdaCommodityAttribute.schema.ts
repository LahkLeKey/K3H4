import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCommodityAttributeCreateManyInputObjectSchema as UsdaCommodityAttributeCreateManyInputObjectSchema } from './objects/UsdaCommodityAttributeCreateManyInput.schema';

export const UsdaCommodityAttributeCreateManySchema: z.ZodType<Prisma.UsdaCommodityAttributeCreateManyArgs> = z.object({ data: z.union([ UsdaCommodityAttributeCreateManyInputObjectSchema, z.array(UsdaCommodityAttributeCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.UsdaCommodityAttributeCreateManyArgs>;

export const UsdaCommodityAttributeCreateManyZodSchema = z.object({ data: z.union([ UsdaCommodityAttributeCreateManyInputObjectSchema, z.array(UsdaCommodityAttributeCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();