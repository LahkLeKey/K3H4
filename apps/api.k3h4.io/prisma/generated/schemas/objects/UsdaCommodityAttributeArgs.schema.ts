import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UsdaCommodityAttributeSelectObjectSchema as UsdaCommodityAttributeSelectObjectSchema } from './UsdaCommodityAttributeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => UsdaCommodityAttributeSelectObjectSchema).optional()
}).strict();
export const UsdaCommodityAttributeArgsObjectSchema = makeSchema();
export const UsdaCommodityAttributeArgsObjectZodSchema = makeSchema();
