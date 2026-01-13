import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  dataset: z.string(),
  code: z.string()
}).strict();
export const UsdaCommodityDatasetCodeCompoundUniqueInputObjectSchema: z.ZodType<Prisma.UsdaCommodityDatasetCodeCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.UsdaCommodityDatasetCodeCompoundUniqueInput>;
export const UsdaCommodityDatasetCodeCompoundUniqueInputObjectZodSchema = makeSchema();
