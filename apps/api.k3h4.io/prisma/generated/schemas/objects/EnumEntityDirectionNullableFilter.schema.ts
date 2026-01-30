import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityDirectionSchema } from '../enums/EntityDirection.schema';
import { NestedEnumEntityDirectionNullableFilterObjectSchema as NestedEnumEntityDirectionNullableFilterObjectSchema } from './NestedEnumEntityDirectionNullableFilter.schema'

const makeSchema = () => z.object({
  equals: EntityDirectionSchema.optional().nullable(),
  in: EntityDirectionSchema.array().optional().nullable(),
  notIn: EntityDirectionSchema.array().optional().nullable(),
  not: z.union([EntityDirectionSchema, z.lazy(() => NestedEnumEntityDirectionNullableFilterObjectSchema)]).optional().nullable()
}).strict();
export const EnumEntityDirectionNullableFilterObjectSchema: z.ZodType<Prisma.EnumEntityDirectionNullableFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumEntityDirectionNullableFilter>;
export const EnumEntityDirectionNullableFilterObjectZodSchema = makeSchema();
