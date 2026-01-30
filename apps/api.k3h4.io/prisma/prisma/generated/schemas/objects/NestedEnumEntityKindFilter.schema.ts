import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityKindSchema } from '../enums/EntityKind.schema'

const nestedenumentitykindfilterSchema = z.object({
  equals: EntityKindSchema.optional(),
  in: EntityKindSchema.array().optional(),
  notIn: EntityKindSchema.array().optional(),
  not: z.union([EntityKindSchema, z.lazy(() => NestedEnumEntityKindFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumEntityKindFilterObjectSchema: z.ZodType<Prisma.NestedEnumEntityKindFilter> = nestedenumentitykindfilterSchema as unknown as z.ZodType<Prisma.NestedEnumEntityKindFilter>;
export const NestedEnumEntityKindFilterObjectZodSchema = nestedenumentitykindfilterSchema;
