import * as z from 'zod';
export const PersonaUpsertResultSchema = z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  alias: z.string(),
  account: z.string(),
  handle: z.string().optional(),
  note: z.string().optional(),
  tags: z.unknown().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  assignments: z.array(z.unknown()),
  assignmentPayouts: z.array(z.unknown()),
  attributes: z.array(z.unknown()),
  compatibilitySources: z.array(z.unknown()),
  compatibilityTargets: z.array(z.unknown())
});