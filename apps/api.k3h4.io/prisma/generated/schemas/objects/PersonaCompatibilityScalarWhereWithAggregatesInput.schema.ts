import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { FloatWithAggregatesFilterObjectSchema as FloatWithAggregatesFilterObjectSchema } from './FloatWithAggregatesFilter.schema';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { JsonNullableWithAggregatesFilterObjectSchema as JsonNullableWithAggregatesFilterObjectSchema } from './JsonNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema'

const personacompatibilityscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => PersonaCompatibilityScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => PersonaCompatibilityScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PersonaCompatibilityScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PersonaCompatibilityScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => PersonaCompatibilityScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  sourceId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  targetId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  jaccardScore: z.union([z.lazy(() => FloatWithAggregatesFilterObjectSchema), z.number()]).optional(),
  intersectionCount: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  unionCount: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  overlappingTokens: z.lazy(() => JsonNullableWithAggregatesFilterObjectSchema).optional(),
  computedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  rationale: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  status: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional()
}).strict();
export const PersonaCompatibilityScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.PersonaCompatibilityScalarWhereWithAggregatesInput> = personacompatibilityscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.PersonaCompatibilityScalarWhereWithAggregatesInput>;
export const PersonaCompatibilityScalarWhereWithAggregatesInputObjectZodSchema = personacompatibilityscalarwherewithaggregatesinputSchema;
