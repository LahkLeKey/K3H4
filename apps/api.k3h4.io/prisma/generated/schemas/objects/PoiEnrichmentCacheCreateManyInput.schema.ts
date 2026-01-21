import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string(),
  includeHash: z.string(),
  payload: z.union([JsonNullValueInputSchema, jsonSchema]),
  fetchedAt: z.coerce.date().optional(),
  expiresAt: z.coerce.date()
}).strict();
export const PoiEnrichmentCacheCreateManyInputObjectSchema: z.ZodType<Prisma.PoiEnrichmentCacheCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.PoiEnrichmentCacheCreateManyInput>;
export const PoiEnrichmentCacheCreateManyInputObjectZodSchema = makeSchema();
