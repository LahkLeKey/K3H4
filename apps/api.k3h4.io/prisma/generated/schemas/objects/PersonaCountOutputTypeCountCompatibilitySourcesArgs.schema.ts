import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCompatibilityWhereInputObjectSchema as PersonaCompatibilityWhereInputObjectSchema } from './PersonaCompatibilityWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaCompatibilityWhereInputObjectSchema).optional()
}).strict();
export const PersonaCountOutputTypeCountCompatibilitySourcesArgsObjectSchema = makeSchema();
export const PersonaCountOutputTypeCountCompatibilitySourcesArgsObjectZodSchema = makeSchema();
