import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { PersonaArgsObjectSchema as PersonaArgsObjectSchema } from './PersonaArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  source: z.union([z.boolean(), z.lazy(() => PersonaArgsObjectSchema)]).optional(),
  target: z.union([z.boolean(), z.lazy(() => PersonaArgsObjectSchema)]).optional()
}).strict();
export const PersonaCompatibilityIncludeObjectSchema: z.ZodType<Prisma.PersonaCompatibilityInclude> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilityInclude>;
export const PersonaCompatibilityIncludeObjectZodSchema = makeSchema();
