import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityCacheWhereUniqueInputObjectSchema as EntityCacheWhereUniqueInputObjectSchema } from './EntityCacheWhereUniqueInput.schema';
import { EntityCacheUpdateWithoutEntityInputObjectSchema as EntityCacheUpdateWithoutEntityInputObjectSchema } from './EntityCacheUpdateWithoutEntityInput.schema';
import { EntityCacheUncheckedUpdateWithoutEntityInputObjectSchema as EntityCacheUncheckedUpdateWithoutEntityInputObjectSchema } from './EntityCacheUncheckedUpdateWithoutEntityInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => EntityCacheWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => EntityCacheUpdateWithoutEntityInputObjectSchema), z.lazy(() => EntityCacheUncheckedUpdateWithoutEntityInputObjectSchema)])
}).strict();
export const EntityCacheUpdateWithWhereUniqueWithoutEntityInputObjectSchema: z.ZodType<Prisma.EntityCacheUpdateWithWhereUniqueWithoutEntityInput> = makeSchema() as unknown as z.ZodType<Prisma.EntityCacheUpdateWithWhereUniqueWithoutEntityInput>;
export const EntityCacheUpdateWithWhereUniqueWithoutEntityInputObjectZodSchema = makeSchema();
