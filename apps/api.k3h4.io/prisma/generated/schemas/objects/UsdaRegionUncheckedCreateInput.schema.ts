import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  dataset: z.string(),
  code: z.string(),
  name: z.string().optional().nullable(),
  wikidataId: z.string().optional().nullable(),
  enrichment: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  extra: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional()
}).strict();
export const UsdaRegionUncheckedCreateInputObjectSchema: z.ZodType<Prisma.UsdaRegionUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.UsdaRegionUncheckedCreateInput>;
export const UsdaRegionUncheckedCreateInputObjectZodSchema = makeSchema();
