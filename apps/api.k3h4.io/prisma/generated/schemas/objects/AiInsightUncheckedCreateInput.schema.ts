import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  targetType: z.string().optional().nullable(),
  targetId: z.string().optional().nullable(),
  targetLabel: z.string().optional().nullable(),
  description: z.string(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  payload: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional()
}).strict();
export const AiInsightUncheckedCreateInputObjectSchema: z.ZodType<Prisma.AiInsightUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.AiInsightUncheckedCreateInput>;
export const AiInsightUncheckedCreateInputObjectZodSchema = makeSchema();
