import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EngagementPrioritySchema } from '../enums/EngagementPriority.schema'

const makeSchema = () => z.object({
  set: EngagementPrioritySchema.optional()
}).strict();
export const EnumEngagementPriorityFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumEngagementPriorityFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumEngagementPriorityFieldUpdateOperationsInput>;
export const EnumEngagementPriorityFieldUpdateOperationsInputObjectZodSchema = makeSchema();
