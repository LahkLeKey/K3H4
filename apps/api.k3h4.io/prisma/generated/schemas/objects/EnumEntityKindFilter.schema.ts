import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityKindSchema } from '../enums/EntityKind.schema';
import { NestedEnumEntityKindFilterObjectSchema as NestedEnumEntityKindFilterObjectSchema } from './NestedEnumEntityKindFilter.schema'

const makeSchema = () => z.object({
  equals: EntityKindSchema.optional(),
  in: EntityKindSchema.array().optional(),
  notIn: EntityKindSchema.array().optional(),
  not: z.union([EntityKindSchema, z.lazy(() => NestedEnumEntityKindFilterObjectSchema)]).optional()
}).strict();
export const EnumEntityKindFilterObjectSchema: z.ZodType<Prisma.EnumEntityKindFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumEntityKindFilter>;
export const EnumEntityKindFilterObjectZodSchema = makeSchema();
