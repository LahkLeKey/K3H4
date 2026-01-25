import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema'

const makeSchema = () => z.object({
  set: LifecycleStatusSchema.optional()
}).strict();
export const EnumLifecycleStatusFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumLifecycleStatusFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumLifecycleStatusFieldUpdateOperationsInput>;
export const EnumLifecycleStatusFieldUpdateOperationsInputObjectZodSchema = makeSchema();
