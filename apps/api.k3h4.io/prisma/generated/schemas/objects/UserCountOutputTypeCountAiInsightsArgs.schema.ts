import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AiInsightWhereInputObjectSchema as AiInsightWhereInputObjectSchema } from './AiInsightWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AiInsightWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountAiInsightsArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountAiInsightsArgsObjectZodSchema = makeSchema();
