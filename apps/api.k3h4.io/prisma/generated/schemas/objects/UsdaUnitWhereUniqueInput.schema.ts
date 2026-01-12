import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UsdaUnitDatasetCodeCompoundUniqueInputObjectSchema as UsdaUnitDatasetCodeCompoundUniqueInputObjectSchema } from './UsdaUnitDatasetCodeCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  dataset_code: z.lazy(() => UsdaUnitDatasetCodeCompoundUniqueInputObjectSchema).optional()
}).strict();
export const UsdaUnitWhereUniqueInputObjectSchema: z.ZodType<Prisma.UsdaUnitWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.UsdaUnitWhereUniqueInput>;
export const UsdaUnitWhereUniqueInputObjectZodSchema = makeSchema();
