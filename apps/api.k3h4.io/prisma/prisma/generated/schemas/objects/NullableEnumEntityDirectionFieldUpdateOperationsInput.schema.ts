import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityDirectionSchema } from '../enums/EntityDirection.schema'

const makeSchema = () => z.object({
  set: EntityDirectionSchema.optional()
}).strict();
export const NullableEnumEntityDirectionFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.NullableEnumEntityDirectionFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.NullableEnumEntityDirectionFieldUpdateOperationsInput>;
export const NullableEnumEntityDirectionFieldUpdateOperationsInputObjectZodSchema = makeSchema();
