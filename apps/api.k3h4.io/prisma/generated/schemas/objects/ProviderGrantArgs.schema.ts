import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProviderGrantSelectObjectSchema as ProviderGrantSelectObjectSchema } from './ProviderGrantSelect.schema';
import { ProviderGrantIncludeObjectSchema as ProviderGrantIncludeObjectSchema } from './ProviderGrantInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ProviderGrantSelectObjectSchema).optional(),
  include: z.lazy(() => ProviderGrantIncludeObjectSchema).optional()
}).strict();
export const ProviderGrantArgsObjectSchema = makeSchema();
export const ProviderGrantArgsObjectZodSchema = makeSchema();
