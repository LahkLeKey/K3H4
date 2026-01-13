import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  dataset: z.string(),
  scope: z.string()
}).strict();
export const UsdaReleaseDatasetScopeCompoundUniqueInputObjectSchema: z.ZodType<Prisma.UsdaReleaseDatasetScopeCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.UsdaReleaseDatasetScopeCompoundUniqueInput>;
export const UsdaReleaseDatasetScopeCompoundUniqueInputObjectZodSchema = makeSchema();
