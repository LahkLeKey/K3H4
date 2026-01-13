import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const personaattributescalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => PersonaAttributeScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => PersonaAttributeScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PersonaAttributeScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PersonaAttributeScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => PersonaAttributeScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  personaId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  category: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  value: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  weight: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const PersonaAttributeScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.PersonaAttributeScalarWhereWithAggregatesInput> = personaattributescalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.PersonaAttributeScalarWhereWithAggregatesInput>;
export const PersonaAttributeScalarWhereWithAggregatesInputObjectZodSchema = personaattributescalarwherewithaggregatesinputSchema;
