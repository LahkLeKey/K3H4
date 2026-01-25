import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  plotId: z.string().optional().nullable(),
  cropPlanId: z.string().optional().nullable(),
  title: z.string(),
  assignee: z.string().optional().nullable(),
  priority: z.number().int().optional(),
  tags: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  notes: z.string().optional().nullable(),
  dueDate: z.coerce.date().optional().nullable(),
  status: LifecycleStatusSchema.optional(),
  createdAt: z.coerce.date().optional()
}).strict();
export const AgricultureTaskUncheckedCreateInputObjectSchema: z.ZodType<Prisma.AgricultureTaskUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureTaskUncheckedCreateInput>;
export const AgricultureTaskUncheckedCreateInputObjectZodSchema = makeSchema();
