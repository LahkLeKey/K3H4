import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const personascalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => PersonaScalarWhereInputObjectSchema), z.lazy(() => PersonaScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PersonaScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PersonaScalarWhereInputObjectSchema), z.lazy(() => PersonaScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  alias: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  account: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  handle: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  note: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  tags: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const PersonaScalarWhereInputObjectSchema: z.ZodType<Prisma.PersonaScalarWhereInput> = personascalarwhereinputSchema as unknown as z.ZodType<Prisma.PersonaScalarWhereInput>;
export const PersonaScalarWhereInputObjectZodSchema = personascalarwhereinputSchema;
