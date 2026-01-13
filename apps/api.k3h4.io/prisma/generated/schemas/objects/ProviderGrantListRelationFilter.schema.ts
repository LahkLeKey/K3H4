import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProviderGrantWhereInputObjectSchema as ProviderGrantWhereInputObjectSchema } from './ProviderGrantWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => ProviderGrantWhereInputObjectSchema).optional(),
  some: z.lazy(() => ProviderGrantWhereInputObjectSchema).optional(),
  none: z.lazy(() => ProviderGrantWhereInputObjectSchema).optional()
}).strict();
export const ProviderGrantListRelationFilterObjectSchema: z.ZodType<Prisma.ProviderGrantListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ProviderGrantListRelationFilter>;
export const ProviderGrantListRelationFilterObjectZodSchema = makeSchema();
