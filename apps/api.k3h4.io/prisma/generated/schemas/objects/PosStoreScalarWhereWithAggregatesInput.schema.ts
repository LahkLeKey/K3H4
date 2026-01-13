import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const posstorescalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => PosStoreScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => PosStoreScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PosStoreScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PosStoreScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => PosStoreScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  channel: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const PosStoreScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.PosStoreScalarWhereWithAggregatesInput> = posstorescalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.PosStoreScalarWhereWithAggregatesInput>;
export const PosStoreScalarWhereWithAggregatesInputObjectZodSchema = posstorescalarwherewithaggregatesinputSchema;
