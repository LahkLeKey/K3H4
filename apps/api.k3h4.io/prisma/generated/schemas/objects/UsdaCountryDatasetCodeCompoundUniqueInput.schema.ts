import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  dataset: z.string(),
  code: z.string()
}).strict();
export const UsdaCountryDatasetCodeCompoundUniqueInputObjectSchema: z.ZodType<Prisma.UsdaCountryDatasetCodeCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.UsdaCountryDatasetCodeCompoundUniqueInput>;
export const UsdaCountryDatasetCodeCompoundUniqueInputObjectZodSchema = makeSchema();
