import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  userId: z.string(),
  sourceId: z.string(),
  targetId: z.string()
}).strict();
export const PersonaCompatibilityUserIdSourceIdTargetIdCompoundUniqueInputObjectSchema: z.ZodType<Prisma.PersonaCompatibilityUserIdSourceIdTargetIdCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilityUserIdSourceIdTargetIdCompoundUniqueInput>;
export const PersonaCompatibilityUserIdSourceIdTargetIdCompoundUniqueInputObjectZodSchema = makeSchema();
