import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CoverageStatusSchema } from '../enums/CoverageStatus.schema'

const makeSchema = () => z.object({
  set: CoverageStatusSchema.optional()
}).strict();
export const EnumCoverageStatusFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumCoverageStatusFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumCoverageStatusFieldUpdateOperationsInput>;
export const EnumCoverageStatusFieldUpdateOperationsInputObjectZodSchema = makeSchema();
