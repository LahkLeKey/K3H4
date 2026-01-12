import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  dataset: z.string(),
  endpoint: z.string(),
  paramsHash: z.string()
}).strict();
export const UsdaCacheEntryDatasetEndpointParamsHashCompoundUniqueInputObjectSchema: z.ZodType<Prisma.UsdaCacheEntryDatasetEndpointParamsHashCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.UsdaCacheEntryDatasetEndpointParamsHashCompoundUniqueInput>;
export const UsdaCacheEntryDatasetEndpointParamsHashCompoundUniqueInputObjectZodSchema = makeSchema();
