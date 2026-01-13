import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UsdaCommodityDatasetCodeCompoundUniqueInputObjectSchema as UsdaCommodityDatasetCodeCompoundUniqueInputObjectSchema } from './UsdaCommodityDatasetCodeCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  dataset_code: z.lazy(() => UsdaCommodityDatasetCodeCompoundUniqueInputObjectSchema).optional()
}).strict();
export const UsdaCommodityWhereUniqueInputObjectSchema: z.ZodType<Prisma.UsdaCommodityWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.UsdaCommodityWhereUniqueInput>;
export const UsdaCommodityWhereUniqueInputObjectZodSchema = makeSchema();
