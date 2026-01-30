import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorTypeSchema } from '../enums/ActorType.schema'

const makeSchema = () => z.object({
  set: ActorTypeSchema.optional()
}).strict();
export const EnumActorTypeFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumActorTypeFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumActorTypeFieldUpdateOperationsInput>;
export const EnumActorTypeFieldUpdateOperationsInputObjectZodSchema = makeSchema();
