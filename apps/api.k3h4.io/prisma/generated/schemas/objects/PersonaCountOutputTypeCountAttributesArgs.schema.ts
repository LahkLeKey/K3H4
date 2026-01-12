import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaAttributeWhereInputObjectSchema as PersonaAttributeWhereInputObjectSchema } from './PersonaAttributeWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaAttributeWhereInputObjectSchema).optional()
}).strict();
export const PersonaCountOutputTypeCountAttributesArgsObjectSchema = makeSchema();
export const PersonaCountOutputTypeCountAttributesArgsObjectZodSchema = makeSchema();
