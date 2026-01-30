import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityKindSchema } from '../enums/EntityKind.schema'

const makeSchema = () => z.object({
  set: EntityKindSchema.optional()
}).strict();
export const EnumEntityKindFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumEntityKindFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumEntityKindFieldUpdateOperationsInput>;
export const EnumEntityKindFieldUpdateOperationsInputObjectZodSchema = makeSchema();
