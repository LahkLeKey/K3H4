import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  dataset: z.string(),
  scope: z.string()
}).strict();
export const UsdaSyncStateDatasetScopeCompoundUniqueInputObjectSchema: z.ZodType<Prisma.UsdaSyncStateDatasetScopeCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.UsdaSyncStateDatasetScopeCompoundUniqueInput>;
export const UsdaSyncStateDatasetScopeCompoundUniqueInputObjectZodSchema = makeSchema();
