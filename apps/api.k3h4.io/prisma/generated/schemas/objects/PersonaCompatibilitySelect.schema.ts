import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { PersonaArgsObjectSchema as PersonaArgsObjectSchema } from './PersonaArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  sourceId: z.boolean().optional(),
  source: z.union([z.boolean(), z.lazy(() => PersonaArgsObjectSchema)]).optional(),
  targetId: z.boolean().optional(),
  target: z.union([z.boolean(), z.lazy(() => PersonaArgsObjectSchema)]).optional(),
  jaccardScore: z.boolean().optional(),
  intersectionCount: z.boolean().optional(),
  unionCount: z.boolean().optional(),
  overlappingTokens: z.boolean().optional(),
  computedAt: z.boolean().optional(),
  rationale: z.boolean().optional(),
  status: z.boolean().optional()
}).strict();
export const PersonaCompatibilitySelectObjectSchema: z.ZodType<Prisma.PersonaCompatibilitySelect> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilitySelect>;
export const PersonaCompatibilitySelectObjectZodSchema = makeSchema();
