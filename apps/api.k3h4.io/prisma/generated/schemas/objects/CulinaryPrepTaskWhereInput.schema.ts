import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const culinarypreptaskwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CulinaryPrepTaskWhereInputObjectSchema), z.lazy(() => CulinaryPrepTaskWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CulinaryPrepTaskWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CulinaryPrepTaskWhereInputObjectSchema), z.lazy(() => CulinaryPrepTaskWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  task: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  station: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  dueAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  status: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional()
}).strict();
export const CulinaryPrepTaskWhereInputObjectSchema: z.ZodType<Prisma.CulinaryPrepTaskWhereInput> = culinarypreptaskwhereinputSchema as unknown as z.ZodType<Prisma.CulinaryPrepTaskWhereInput>;
export const CulinaryPrepTaskWhereInputObjectZodSchema = culinarypreptaskwhereinputSchema;
