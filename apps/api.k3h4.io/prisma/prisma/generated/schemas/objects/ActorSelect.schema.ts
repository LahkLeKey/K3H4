import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { EntityFindManySchema as EntityFindManySchema } from '../findManyEntity.schema';
import { ActorCacheFindManySchema as ActorCacheFindManySchema } from '../findManyActorCache.schema';
import { ActorCountOutputTypeArgsObjectSchema as ActorCountOutputTypeArgsObjectSchema } from './ActorCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  label: z.boolean().optional(),
  type: z.boolean().optional(),
  note: z.boolean().optional(),
  source: z.boolean().optional(),
  metadata: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  entities: z.union([z.boolean(), z.lazy(() => EntityFindManySchema)]).optional(),
  caches: z.union([z.boolean(), z.lazy(() => ActorCacheFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => ActorCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const ActorSelectObjectSchema: z.ZodType<Prisma.ActorSelect> = makeSchema() as unknown as z.ZodType<Prisma.ActorSelect>;
export const ActorSelectObjectZodSchema = makeSchema();
