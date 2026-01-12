import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { FloatFilterObjectSchema as FloatFilterObjectSchema } from './FloatFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { PersonaScalarRelationFilterObjectSchema as PersonaScalarRelationFilterObjectSchema } from './PersonaScalarRelationFilter.schema';
import { PersonaWhereInputObjectSchema as PersonaWhereInputObjectSchema } from './PersonaWhereInput.schema'

const personacompatibilitywhereinputSchema = z.object({
  AND: z.union([z.lazy(() => PersonaCompatibilityWhereInputObjectSchema), z.lazy(() => PersonaCompatibilityWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PersonaCompatibilityWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PersonaCompatibilityWhereInputObjectSchema), z.lazy(() => PersonaCompatibilityWhereInputObjectSchema).array()]).optional(),
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
  status: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  source: z.union([z.lazy(() => PersonaScalarRelationFilterObjectSchema), z.lazy(() => PersonaWhereInputObjectSchema)]).optional(),
  target: z.union([z.lazy(() => PersonaScalarRelationFilterObjectSchema), z.lazy(() => PersonaWhereInputObjectSchema)]).optional()
}).strict();
export const PersonaCompatibilityWhereInputObjectSchema: z.ZodType<Prisma.PersonaCompatibilityWhereInput> = personacompatibilitywhereinputSchema as unknown as z.ZodType<Prisma.PersonaCompatibilityWhereInput>;
export const PersonaCompatibilityWhereInputObjectZodSchema = personacompatibilitywhereinputSchema;
