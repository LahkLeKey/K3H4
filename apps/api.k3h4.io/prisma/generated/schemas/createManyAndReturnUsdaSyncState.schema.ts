import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaSyncStateSelectObjectSchema as UsdaSyncStateSelectObjectSchema } from './objects/UsdaSyncStateSelect.schema';
import { UsdaSyncStateCreateManyInputObjectSchema as UsdaSyncStateCreateManyInputObjectSchema } from './objects/UsdaSyncStateCreateManyInput.schema';

export const UsdaSyncStateCreateManyAndReturnSchema: z.ZodType<Prisma.UsdaSyncStateCreateManyAndReturnArgs> = z.object({ select: UsdaSyncStateSelectObjectSchema.optional(), data: z.union([ UsdaSyncStateCreateManyInputObjectSchema, z.array(UsdaSyncStateCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.UsdaSyncStateCreateManyAndReturnArgs>;

export const UsdaSyncStateCreateManyAndReturnZodSchema = z.object({ select: UsdaSyncStateSelectObjectSchema.optional(), data: z.union([ UsdaSyncStateCreateManyInputObjectSchema, z.array(UsdaSyncStateCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();