import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { FloatFilterObjectSchema as FloatFilterObjectSchema } from './FloatFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema'

const personacompatibilityscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => PersonaCompatibilityScalarWhereInputObjectSchema), z.lazy(() => PersonaCompatibilityScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PersonaCompatibilityScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PersonaCompatibilityScalarWhereInputObjectSchema), z.lazy(() => PersonaCompatibilityScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  sourceId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  targetId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  jaccardScore: z.union([z.lazy(() => FloatFilterObjectSchema), z.number()]).optional(),
  intersectionCount: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  unionCount: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  overlappingTokens: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  computedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  rationale: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  status: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional()
}).strict();
export const PersonaCompatibilityScalarWhereInputObjectSchema: z.ZodType<Prisma.PersonaCompatibilityScalarWhereInput> = personacompatibilityscalarwhereinputSchema as unknown as z.ZodType<Prisma.PersonaCompatibilityScalarWhereInput>;
export const PersonaCompatibilityScalarWhereInputObjectZodSchema = personacompatibilityscalarwhereinputSchema;
