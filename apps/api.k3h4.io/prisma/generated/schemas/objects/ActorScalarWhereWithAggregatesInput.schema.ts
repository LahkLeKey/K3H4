import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { EnumActorTypeWithAggregatesFilterObjectSchema as EnumActorTypeWithAggregatesFilterObjectSchema } from './EnumActorTypeWithAggregatesFilter.schema';
import { ActorTypeSchema } from '../enums/ActorType.schema';
import { JsonNullableWithAggregatesFilterObjectSchema as JsonNullableWithAggregatesFilterObjectSchema } from './JsonNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const actorscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => ActorScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ActorScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ActorScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ActorScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ActorScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  label: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  type: z.union([z.lazy(() => EnumActorTypeWithAggregatesFilterObjectSchema), ActorTypeSchema]).optional(),
  note: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  source: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  metadata: z.lazy(() => JsonNullableWithAggregatesFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const ActorScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.ActorScalarWhereWithAggregatesInput> = actorscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.ActorScalarWhereWithAggregatesInput>;
export const ActorScalarWhereWithAggregatesInputObjectZodSchema = actorscalarwherewithaggregatesinputSchema;
