import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const personaattributescalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => PersonaAttributeScalarWhereInputObjectSchema), z.lazy(() => PersonaAttributeScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PersonaAttributeScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PersonaAttributeScalarWhereInputObjectSchema), z.lazy(() => PersonaAttributeScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  personaId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  category: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  value: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  weight: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const PersonaAttributeScalarWhereInputObjectSchema: z.ZodType<Prisma.PersonaAttributeScalarWhereInput> = personaattributescalarwhereinputSchema as unknown as z.ZodType<Prisma.PersonaAttributeScalarWhereInput>;
export const PersonaAttributeScalarWhereInputObjectZodSchema = personaattributescalarwhereinputSchema;
