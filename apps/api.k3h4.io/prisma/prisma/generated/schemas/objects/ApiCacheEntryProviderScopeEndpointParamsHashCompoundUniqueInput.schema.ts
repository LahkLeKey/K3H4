import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  provider: z.string(),
  scope: z.string(),
  endpoint: z.string(),
  paramsHash: z.string()
}).strict();
export const ApiCacheEntryProviderScopeEndpointParamsHashCompoundUniqueInputObjectSchema: z.ZodType<Prisma.ApiCacheEntryProviderScopeEndpointParamsHashCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ApiCacheEntryProviderScopeEndpointParamsHashCompoundUniqueInput>;
export const ApiCacheEntryProviderScopeEndpointParamsHashCompoundUniqueInputObjectZodSchema = makeSchema();
