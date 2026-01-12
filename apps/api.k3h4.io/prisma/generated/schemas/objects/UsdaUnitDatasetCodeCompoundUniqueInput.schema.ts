import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  dataset: z.string(),
  code: z.string()
}).strict();
export const UsdaUnitDatasetCodeCompoundUniqueInputObjectSchema: z.ZodType<Prisma.UsdaUnitDatasetCodeCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.UsdaUnitDatasetCodeCompoundUniqueInput>;
export const UsdaUnitDatasetCodeCompoundUniqueInputObjectZodSchema = makeSchema();
