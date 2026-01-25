import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  task: z.string(),
  station: z.string(),
  dueAt: z.coerce.date().optional().nullable(),
  status: LifecycleStatusSchema.optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const CulinaryPrepTaskUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.CulinaryPrepTaskUncheckedCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryPrepTaskUncheckedCreateWithoutUserInput>;
export const CulinaryPrepTaskUncheckedCreateWithoutUserInputObjectZodSchema = makeSchema();
