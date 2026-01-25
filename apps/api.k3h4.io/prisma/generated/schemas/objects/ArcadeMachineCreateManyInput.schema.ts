import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  name: z.string(),
  gameTitle: z.string(),
  status: LifecycleStatusSchema.optional(),
  location: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const ArcadeMachineCreateManyInputObjectSchema: z.ZodType<Prisma.ArcadeMachineCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeMachineCreateManyInput>;
export const ArcadeMachineCreateManyInputObjectZodSchema = makeSchema();
