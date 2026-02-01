import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityDirectionSchema } from '../enums/EntityDirection.schema'

const nestedenumentitydirectionnullablefilterSchema = z.object({
  equals: EntityDirectionSchema.optional().nullable(),
  in: EntityDirectionSchema.array().optional().nullable(),
  notIn: EntityDirectionSchema.array().optional().nullable(),
  not: z.union([EntityDirectionSchema, z.lazy(() => NestedEnumEntityDirectionNullableFilterObjectSchema)]).optional().nullable()
}).strict();
export const NestedEnumEntityDirectionNullableFilterObjectSchema: z.ZodType<Prisma.NestedEnumEntityDirectionNullableFilter> = nestedenumentitydirectionnullablefilterSchema as unknown as z.ZodType<Prisma.NestedEnumEntityDirectionNullableFilter>;
export const NestedEnumEntityDirectionNullableFilterObjectZodSchema = nestedenumentitydirectionnullablefilterSchema;
