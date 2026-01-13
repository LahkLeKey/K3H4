import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UsdaReleaseDatasetScopeCompoundUniqueInputObjectSchema as UsdaReleaseDatasetScopeCompoundUniqueInputObjectSchema } from './UsdaReleaseDatasetScopeCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  dataset_scope: z.lazy(() => UsdaReleaseDatasetScopeCompoundUniqueInputObjectSchema).optional()
}).strict();
export const UsdaReleaseWhereUniqueInputObjectSchema: z.ZodType<Prisma.UsdaReleaseWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.UsdaReleaseWhereUniqueInput>;
export const UsdaReleaseWhereUniqueInputObjectZodSchema = makeSchema();
