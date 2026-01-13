import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UsdaCacheEntryDatasetEndpointParamsHashCompoundUniqueInputObjectSchema as UsdaCacheEntryDatasetEndpointParamsHashCompoundUniqueInputObjectSchema } from './UsdaCacheEntryDatasetEndpointParamsHashCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  dataset_endpoint_paramsHash: z.lazy(() => UsdaCacheEntryDatasetEndpointParamsHashCompoundUniqueInputObjectSchema).optional()
}).strict();
export const UsdaCacheEntryWhereUniqueInputObjectSchema: z.ZodType<Prisma.UsdaCacheEntryWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.UsdaCacheEntryWhereUniqueInput>;
export const UsdaCacheEntryWhereUniqueInputObjectZodSchema = makeSchema();
