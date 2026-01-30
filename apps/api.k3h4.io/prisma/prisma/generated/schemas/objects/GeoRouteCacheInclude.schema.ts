import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { GeoDirectionFindManySchema as GeoDirectionFindManySchema } from '../findManyGeoDirection.schema';
import { GeoRouteCacheCountOutputTypeArgsObjectSchema as GeoRouteCacheCountOutputTypeArgsObjectSchema } from './GeoRouteCacheCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  directions: z.union([z.boolean(), z.lazy(() => GeoDirectionFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => GeoRouteCacheCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const GeoRouteCacheIncludeObjectSchema: z.ZodType<Prisma.GeoRouteCacheInclude> = makeSchema() as unknown as z.ZodType<Prisma.GeoRouteCacheInclude>;
export const GeoRouteCacheIncludeObjectZodSchema = makeSchema();
