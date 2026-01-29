import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { EnumBankActorTypeFilterObjectSchema as EnumBankActorTypeFilterObjectSchema } from './EnumBankActorTypeFilter.schema';
import { BankActorTypeSchema } from '../enums/BankActorType.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserNullableScalarRelationFilterObjectSchema as UserNullableScalarRelationFilterObjectSchema } from './UserNullableScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { EntityListRelationFilterObjectSchema as EntityListRelationFilterObjectSchema } from './EntityListRelationFilter.schema'

const actorwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ActorWhereInputObjectSchema), z.lazy(() => ActorWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ActorWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ActorWhereInputObjectSchema), z.lazy(() => ActorWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  label: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  type: z.union([z.lazy(() => EnumBankActorTypeFilterObjectSchema), BankActorTypeSchema]).optional(),
  note: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  source: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  metadata: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserNullableScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  entities: z.lazy(() => EntityListRelationFilterObjectSchema).optional()
}).strict();
export const ActorWhereInputObjectSchema: z.ZodType<Prisma.ActorWhereInput> = actorwhereinputSchema as unknown as z.ZodType<Prisma.ActorWhereInput>;
export const ActorWhereInputObjectZodSchema = actorwhereinputSchema;
