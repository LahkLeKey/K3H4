import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  dataset: z.string(),
  code: z.string()
}).strict();
export const UsdaCommodityAttributeDatasetCodeCompoundUniqueInputObjectSchema: z.ZodType<Prisma.UsdaCommodityAttributeDatasetCodeCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.UsdaCommodityAttributeDatasetCodeCompoundUniqueInput>;
export const UsdaCommodityAttributeDatasetCodeCompoundUniqueInputObjectZodSchema = makeSchema();
