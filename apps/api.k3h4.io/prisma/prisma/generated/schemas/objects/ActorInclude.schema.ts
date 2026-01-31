import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { EntityFindManySchema as EntityFindManySchema } from '../findManyEntity.schema';
import { ActorCacheFindManySchema as ActorCacheFindManySchema } from '../findManyActorCache.schema';
import { ActorCountOutputTypeArgsObjectSchema as ActorCountOutputTypeArgsObjectSchema } from './ActorCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  entities: z.union([z.boolean(), z.lazy(() => EntityFindManySchema)]).optional(),
  caches: z.union([z.boolean(), z.lazy(() => ActorCacheFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => ActorCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const ActorIncludeObjectSchema: z.ZodType<Prisma.ActorInclude> = makeSchema() as unknown as z.ZodType<Prisma.ActorInclude>;
export const ActorIncludeObjectZodSchema = makeSchema();
