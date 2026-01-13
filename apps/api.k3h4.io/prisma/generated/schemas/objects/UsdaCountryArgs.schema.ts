import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UsdaCountrySelectObjectSchema as UsdaCountrySelectObjectSchema } from './UsdaCountrySelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => UsdaCountrySelectObjectSchema).optional()
}).strict();
export const UsdaCountryArgsObjectSchema = makeSchema();
export const UsdaCountryArgsObjectZodSchema = makeSchema();
