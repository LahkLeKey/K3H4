import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WikidataCacheEntryResourceEndpointParamsHashCompoundUniqueInputObjectSchema as WikidataCacheEntryResourceEndpointParamsHashCompoundUniqueInputObjectSchema } from './WikidataCacheEntryResourceEndpointParamsHashCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  resource_endpoint_paramsHash: z.lazy(() => WikidataCacheEntryResourceEndpointParamsHashCompoundUniqueInputObjectSchema).optional()
}).strict();
export const WikidataCacheEntryWhereUniqueInputObjectSchema: z.ZodType<Prisma.WikidataCacheEntryWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.WikidataCacheEntryWhereUniqueInput>;
export const WikidataCacheEntryWhereUniqueInputObjectZodSchema = makeSchema();
