import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorTypeSchema } from '../enums/ActorType.schema'

const nestedenumactortypefilterSchema = z.object({
  equals: ActorTypeSchema.optional(),
  in: ActorTypeSchema.array().optional(),
  notIn: ActorTypeSchema.array().optional(),
  not: z.union([ActorTypeSchema, z.lazy(() => NestedEnumActorTypeFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumActorTypeFilterObjectSchema: z.ZodType<Prisma.NestedEnumActorTypeFilter> = nestedenumactortypefilterSchema as unknown as z.ZodType<Prisma.NestedEnumActorTypeFilter>;
export const NestedEnumActorTypeFilterObjectZodSchema = nestedenumactortypefilterSchema;
