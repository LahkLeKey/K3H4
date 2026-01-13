import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaWhereInputObjectSchema as PersonaWhereInputObjectSchema } from './PersonaWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountPersonasArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountPersonasArgsObjectZodSchema = makeSchema();
