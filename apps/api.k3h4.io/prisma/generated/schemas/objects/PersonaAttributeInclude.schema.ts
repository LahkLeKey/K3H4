import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { PersonaArgsObjectSchema as PersonaArgsObjectSchema } from './PersonaArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  persona: z.union([z.boolean(), z.lazy(() => PersonaArgsObjectSchema)]).optional()
}).strict();
export const PersonaAttributeIncludeObjectSchema: z.ZodType<Prisma.PersonaAttributeInclude> = makeSchema() as unknown as z.ZodType<Prisma.PersonaAttributeInclude>;
export const PersonaAttributeIncludeObjectZodSchema = makeSchema();
