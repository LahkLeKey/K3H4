import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { PersonaScalarRelationFilterObjectSchema as PersonaScalarRelationFilterObjectSchema } from './PersonaScalarRelationFilter.schema';
import { PersonaWhereInputObjectSchema as PersonaWhereInputObjectSchema } from './PersonaWhereInput.schema'

const personaattributewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => PersonaAttributeWhereInputObjectSchema), z.lazy(() => PersonaAttributeWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PersonaAttributeWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PersonaAttributeWhereInputObjectSchema), z.lazy(() => PersonaAttributeWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  personaId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  category: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  value: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  weight: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  persona: z.union([z.lazy(() => PersonaScalarRelationFilterObjectSchema), z.lazy(() => PersonaWhereInputObjectSchema)]).optional()
}).strict();
export const PersonaAttributeWhereInputObjectSchema: z.ZodType<Prisma.PersonaAttributeWhereInput> = personaattributewhereinputSchema as unknown as z.ZodType<Prisma.PersonaAttributeWhereInput>;
export const PersonaAttributeWhereInputObjectZodSchema = personaattributewhereinputSchema;
