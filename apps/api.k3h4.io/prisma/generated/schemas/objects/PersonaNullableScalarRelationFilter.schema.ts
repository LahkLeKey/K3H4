import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaWhereInputObjectSchema as PersonaWhereInputObjectSchema } from './PersonaWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => PersonaWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => PersonaWhereInputObjectSchema).optional().nullable()
}).strict();
export const PersonaNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.PersonaNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.PersonaNullableScalarRelationFilter>;
export const PersonaNullableScalarRelationFilterObjectZodSchema = makeSchema();
