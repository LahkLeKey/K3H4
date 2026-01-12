import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaSyncStateCreateManyInputObjectSchema as UsdaSyncStateCreateManyInputObjectSchema } from './objects/UsdaSyncStateCreateManyInput.schema';

export const UsdaSyncStateCreateManySchema: z.ZodType<Prisma.UsdaSyncStateCreateManyArgs> = z.object({ data: z.union([ UsdaSyncStateCreateManyInputObjectSchema, z.array(UsdaSyncStateCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.UsdaSyncStateCreateManyArgs>;

export const UsdaSyncStateCreateManyZodSchema = z.object({ data: z.union([ UsdaSyncStateCreateManyInputObjectSchema, z.array(UsdaSyncStateCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();