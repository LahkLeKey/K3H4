import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OllamaOperationWhereInputObjectSchema as OllamaOperationWhereInputObjectSchema } from './OllamaOperationWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => OllamaOperationWhereInputObjectSchema).optional(),
  some: z.lazy(() => OllamaOperationWhereInputObjectSchema).optional(),
  none: z.lazy(() => OllamaOperationWhereInputObjectSchema).optional()
}).strict();
export const OllamaOperationListRelationFilterObjectSchema: z.ZodType<Prisma.OllamaOperationListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.OllamaOperationListRelationFilter>;
export const OllamaOperationListRelationFilterObjectZodSchema = makeSchema();
