import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  dataset: z.string(),
  code: z.string()
}).strict();
export const UsdaRegionDatasetCodeCompoundUniqueInputObjectSchema: z.ZodType<Prisma.UsdaRegionDatasetCodeCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.UsdaRegionDatasetCodeCompoundUniqueInput>;
export const UsdaRegionDatasetCodeCompoundUniqueInputObjectZodSchema = makeSchema();
