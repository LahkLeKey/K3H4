import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UsdaCommodityAttributeDatasetCodeCompoundUniqueInputObjectSchema as UsdaCommodityAttributeDatasetCodeCompoundUniqueInputObjectSchema } from './UsdaCommodityAttributeDatasetCodeCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  dataset_code: z.lazy(() => UsdaCommodityAttributeDatasetCodeCompoundUniqueInputObjectSchema).optional()
}).strict();
export const UsdaCommodityAttributeWhereUniqueInputObjectSchema: z.ZodType<Prisma.UsdaCommodityAttributeWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.UsdaCommodityAttributeWhereUniqueInput>;
export const UsdaCommodityAttributeWhereUniqueInputObjectZodSchema = makeSchema();
