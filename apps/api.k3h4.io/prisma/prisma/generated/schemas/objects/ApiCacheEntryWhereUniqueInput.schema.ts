import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApiCacheEntryProviderScopeEndpointParamsHashCompoundUniqueInputObjectSchema as ApiCacheEntryProviderScopeEndpointParamsHashCompoundUniqueInputObjectSchema } from './ApiCacheEntryProviderScopeEndpointParamsHashCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  provider_scope_endpoint_paramsHash: z.lazy(() => ApiCacheEntryProviderScopeEndpointParamsHashCompoundUniqueInputObjectSchema).optional()
}).strict();
export const ApiCacheEntryWhereUniqueInputObjectSchema: z.ZodType<Prisma.ApiCacheEntryWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ApiCacheEntryWhereUniqueInput>;
export const ApiCacheEntryWhereUniqueInputObjectZodSchema = makeSchema();
