import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const posstorescalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => PosStoreScalarWhereInputObjectSchema), z.lazy(() => PosStoreScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PosStoreScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PosStoreScalarWhereInputObjectSchema), z.lazy(() => PosStoreScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  channel: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const PosStoreScalarWhereInputObjectSchema: z.ZodType<Prisma.PosStoreScalarWhereInput> = posstorescalarwhereinputSchema as unknown as z.ZodType<Prisma.PosStoreScalarWhereInput>;
export const PosStoreScalarWhereInputObjectZodSchema = posstorescalarwhereinputSchema;
