import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UsdaCountryDatasetCodeCompoundUniqueInputObjectSchema as UsdaCountryDatasetCodeCompoundUniqueInputObjectSchema } from './UsdaCountryDatasetCodeCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  dataset_code: z.lazy(() => UsdaCountryDatasetCodeCompoundUniqueInputObjectSchema).optional()
}).strict();
export const UsdaCountryWhereUniqueInputObjectSchema: z.ZodType<Prisma.UsdaCountryWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.UsdaCountryWhereUniqueInput>;
export const UsdaCountryWhereUniqueInputObjectZodSchema = makeSchema();
