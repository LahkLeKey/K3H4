import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityCacheScalarWhereInputObjectSchema as EntityCacheScalarWhereInputObjectSchema } from './EntityCacheScalarWhereInput.schema';
import { EntityCacheUpdateManyMutationInputObjectSchema as EntityCacheUpdateManyMutationInputObjectSchema } from './EntityCacheUpdateManyMutationInput.schema';
import { EntityCacheUncheckedUpdateManyWithoutEntityInputObjectSchema as EntityCacheUncheckedUpdateManyWithoutEntityInputObjectSchema } from './EntityCacheUncheckedUpdateManyWithoutEntityInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => EntityCacheScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => EntityCacheUpdateManyMutationInputObjectSchema), z.lazy(() => EntityCacheUncheckedUpdateManyWithoutEntityInputObjectSchema)])
}).strict();
export const EntityCacheUpdateManyWithWhereWithoutEntityInputObjectSchema: z.ZodType<Prisma.EntityCacheUpdateManyWithWhereWithoutEntityInput> = makeSchema() as unknown as z.ZodType<Prisma.EntityCacheUpdateManyWithWhereWithoutEntityInput>;
export const EntityCacheUpdateManyWithWhereWithoutEntityInputObjectZodSchema = makeSchema();
