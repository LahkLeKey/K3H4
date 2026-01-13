import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UsdaRegionDatasetCodeCompoundUniqueInputObjectSchema as UsdaRegionDatasetCodeCompoundUniqueInputObjectSchema } from './UsdaRegionDatasetCodeCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  dataset_code: z.lazy(() => UsdaRegionDatasetCodeCompoundUniqueInputObjectSchema).optional()
}).strict();
export const UsdaRegionWhereUniqueInputObjectSchema: z.ZodType<Prisma.UsdaRegionWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.UsdaRegionWhereUniqueInput>;
export const UsdaRegionWhereUniqueInputObjectZodSchema = makeSchema();
