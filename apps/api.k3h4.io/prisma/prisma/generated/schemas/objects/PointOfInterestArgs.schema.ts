import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PointOfInterestSelectObjectSchema as PointOfInterestSelectObjectSchema } from './PointOfInterestSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => PointOfInterestSelectObjectSchema).optional()
}).strict();
export const PointOfInterestArgsObjectSchema = makeSchema();
export const PointOfInterestArgsObjectZodSchema = makeSchema();
