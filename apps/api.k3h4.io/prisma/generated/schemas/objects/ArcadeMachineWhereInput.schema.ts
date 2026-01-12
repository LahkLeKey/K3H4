import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { ArcadeSessionListRelationFilterObjectSchema as ArcadeSessionListRelationFilterObjectSchema } from './ArcadeSessionListRelationFilter.schema'

const arcademachinewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ArcadeMachineWhereInputObjectSchema), z.lazy(() => ArcadeMachineWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ArcadeMachineWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ArcadeMachineWhereInputObjectSchema), z.lazy(() => ArcadeMachineWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  gameTitle: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  status: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  location: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  sessions: z.lazy(() => ArcadeSessionListRelationFilterObjectSchema).optional()
}).strict();
export const ArcadeMachineWhereInputObjectSchema: z.ZodType<Prisma.ArcadeMachineWhereInput> = arcademachinewhereinputSchema as unknown as z.ZodType<Prisma.ArcadeMachineWhereInput>;
export const ArcadeMachineWhereInputObjectZodSchema = arcademachinewhereinputSchema;
