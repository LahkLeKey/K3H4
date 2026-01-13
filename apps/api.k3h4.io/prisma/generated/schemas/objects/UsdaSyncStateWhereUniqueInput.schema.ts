import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UsdaSyncStateDatasetScopeCompoundUniqueInputObjectSchema as UsdaSyncStateDatasetScopeCompoundUniqueInputObjectSchema } from './UsdaSyncStateDatasetScopeCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  dataset_scope: z.lazy(() => UsdaSyncStateDatasetScopeCompoundUniqueInputObjectSchema).optional()
}).strict();
export const UsdaSyncStateWhereUniqueInputObjectSchema: z.ZodType<Prisma.UsdaSyncStateWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.UsdaSyncStateWhereUniqueInput>;
export const UsdaSyncStateWhereUniqueInputObjectZodSchema = makeSchema();
