import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  dataset: z.string(),
  scope: z.string(),
  releasedOn: z.coerce.date(),
  note: z.string().optional().nullable(),
  fetchedAt: z.coerce.date().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const UsdaReleaseCreateManyInputObjectSchema: z.ZodType<Prisma.UsdaReleaseCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.UsdaReleaseCreateManyInput>;
export const UsdaReleaseCreateManyInputObjectZodSchema = makeSchema();
