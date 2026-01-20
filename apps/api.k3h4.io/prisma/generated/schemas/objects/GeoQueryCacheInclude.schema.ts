import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional()
}).strict();
export const GeoQueryCacheIncludeObjectSchema: z.ZodType<Prisma.GeoQueryCacheInclude> = makeSchema() as unknown as z.ZodType<Prisma.GeoQueryCacheInclude>;
export const GeoQueryCacheIncludeObjectZodSchema = makeSchema();
