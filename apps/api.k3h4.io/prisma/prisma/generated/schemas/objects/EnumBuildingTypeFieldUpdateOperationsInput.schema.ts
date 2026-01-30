import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BuildingTypeSchema } from '../enums/BuildingType.schema'

const makeSchema = () => z.object({
  set: BuildingTypeSchema.optional()
}).strict();
export const EnumBuildingTypeFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumBuildingTypeFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumBuildingTypeFieldUpdateOperationsInput>;
export const EnumBuildingTypeFieldUpdateOperationsInputObjectZodSchema = makeSchema();
