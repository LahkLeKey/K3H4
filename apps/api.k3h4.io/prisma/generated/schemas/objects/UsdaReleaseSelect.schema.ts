import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.boolean().optional(),
  dataset: z.boolean().optional(),
  scope: z.boolean().optional(),
  releasedOn: z.boolean().optional(),
  note: z.boolean().optional(),
  fetchedAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const UsdaReleaseSelectObjectSchema: z.ZodType<Prisma.UsdaReleaseSelect> = makeSchema() as unknown as z.ZodType<Prisma.UsdaReleaseSelect>;
export const UsdaReleaseSelectObjectZodSchema = makeSchema();
