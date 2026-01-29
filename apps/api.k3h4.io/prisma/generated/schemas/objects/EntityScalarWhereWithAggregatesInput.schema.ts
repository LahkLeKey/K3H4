import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { EnumBankTransactionKindWithAggregatesFilterObjectSchema as EnumBankTransactionKindWithAggregatesFilterObjectSchema } from './EnumBankTransactionKindWithAggregatesFilter.schema';
import { BankTransactionKindSchema } from '../enums/BankTransactionKind.schema';
import { EnumBankTransactionDirectionNullableWithAggregatesFilterObjectSchema as EnumBankTransactionDirectionNullableWithAggregatesFilterObjectSchema } from './EnumBankTransactionDirectionNullableWithAggregatesFilter.schema';
import { BankTransactionDirectionSchema } from '../enums/BankTransactionDirection.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { JsonNullableWithAggregatesFilterObjectSchema as JsonNullableWithAggregatesFilterObjectSchema } from './JsonNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const entityscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => EntityScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => EntityScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => EntityScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => EntityScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => EntityScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  actorId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  kind: z.union([z.lazy(() => EnumBankTransactionKindWithAggregatesFilterObjectSchema), BankTransactionKindSchema]).optional(),
  direction: z.union([z.lazy(() => EnumBankTransactionDirectionNullableWithAggregatesFilterObjectSchema), BankTransactionDirectionSchema]).optional().nullable(),
  name: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  targetType: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  targetId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  source: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  metadata: z.lazy(() => JsonNullableWithAggregatesFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const EntityScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.EntityScalarWhereWithAggregatesInput> = entityscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.EntityScalarWhereWithAggregatesInput>;
export const EntityScalarWhereWithAggregatesInputObjectZodSchema = entityscalarwherewithaggregatesinputSchema;
