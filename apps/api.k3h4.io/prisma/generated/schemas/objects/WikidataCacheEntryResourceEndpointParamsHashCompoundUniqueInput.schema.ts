import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  resource: z.string(),
  endpoint: z.string(),
  paramsHash: z.string()
}).strict();
export const WikidataCacheEntryResourceEndpointParamsHashCompoundUniqueInputObjectSchema: z.ZodType<Prisma.WikidataCacheEntryResourceEndpointParamsHashCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.WikidataCacheEntryResourceEndpointParamsHashCompoundUniqueInput>;
export const WikidataCacheEntryResourceEndpointParamsHashCompoundUniqueInputObjectZodSchema = makeSchema();
