import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.boolean().optional(),
  dataset: z.boolean().optional(),
  code: z.boolean().optional(),
  name: z.boolean().optional(),
  regionCode: z.boolean().optional(),
  wikidataId: z.boolean().optional(),
  enrichment: z.boolean().optional(),
  extra: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const UsdaCountrySelectObjectSchema: z.ZodType<Prisma.UsdaCountrySelect> = makeSchema() as unknown as z.ZodType<Prisma.UsdaCountrySelect>;
export const UsdaCountrySelectObjectZodSchema = makeSchema();
