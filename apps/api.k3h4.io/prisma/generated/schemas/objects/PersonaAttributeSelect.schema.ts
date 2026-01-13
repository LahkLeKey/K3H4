import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { PersonaArgsObjectSchema as PersonaArgsObjectSchema } from './PersonaArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  personaId: z.boolean().optional(),
  persona: z.union([z.boolean(), z.lazy(() => PersonaArgsObjectSchema)]).optional(),
  category: z.boolean().optional(),
  value: z.boolean().optional(),
  weight: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const PersonaAttributeSelectObjectSchema: z.ZodType<Prisma.PersonaAttributeSelect> = makeSchema() as unknown as z.ZodType<Prisma.PersonaAttributeSelect>;
export const PersonaAttributeSelectObjectZodSchema = makeSchema();
