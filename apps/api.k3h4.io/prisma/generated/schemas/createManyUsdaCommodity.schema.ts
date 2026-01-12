import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCommodityCreateManyInputObjectSchema as UsdaCommodityCreateManyInputObjectSchema } from './objects/UsdaCommodityCreateManyInput.schema';

export const UsdaCommodityCreateManySchema: z.ZodType<Prisma.UsdaCommodityCreateManyArgs> = z.object({ data: z.union([ UsdaCommodityCreateManyInputObjectSchema, z.array(UsdaCommodityCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.UsdaCommodityCreateManyArgs>;

export const UsdaCommodityCreateManyZodSchema = z.object({ data: z.union([ UsdaCommodityCreateManyInputObjectSchema, z.array(UsdaCommodityCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();