import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCompatibilityUserIdSourceIdTargetIdCompoundUniqueInputObjectSchema as PersonaCompatibilityUserIdSourceIdTargetIdCompoundUniqueInputObjectSchema } from './PersonaCompatibilityUserIdSourceIdTargetIdCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  userId_sourceId_targetId: z.lazy(() => PersonaCompatibilityUserIdSourceIdTargetIdCompoundUniqueInputObjectSchema).optional()
}).strict();
export const PersonaCompatibilityWhereUniqueInputObjectSchema: z.ZodType<Prisma.PersonaCompatibilityWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilityWhereUniqueInput>;
export const PersonaCompatibilityWhereUniqueInputObjectZodSchema = makeSchema();
