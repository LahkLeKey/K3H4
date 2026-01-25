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
export const CulinaryPrepTaskCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.CulinaryPrepTaskCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryPrepTaskCreateWithoutUserInput>;
export const CulinaryPrepTaskCreateWithoutUserInputObjectZodSchema = makeSchema();
