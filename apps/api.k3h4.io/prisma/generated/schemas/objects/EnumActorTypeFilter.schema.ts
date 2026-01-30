import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorTypeSchema } from '../enums/ActorType.schema';
import { NestedEnumActorTypeFilterObjectSchema as NestedEnumActorTypeFilterObjectSchema } from './NestedEnumActorTypeFilter.schema'

const makeSchema = () => z.object({
  equals: ActorTypeSchema.optional(),
  in: ActorTypeSchema.array().optional(),
  notIn: ActorTypeSchema.array().optional(),
  not: z.union([ActorTypeSchema, z.lazy(() => NestedEnumActorTypeFilterObjectSchema)]).optional()
}).strict();
export const EnumActorTypeFilterObjectSchema: z.ZodType<Prisma.EnumActorTypeFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumActorTypeFilter>;
export const EnumActorTypeFilterObjectZodSchema = makeSchema();
