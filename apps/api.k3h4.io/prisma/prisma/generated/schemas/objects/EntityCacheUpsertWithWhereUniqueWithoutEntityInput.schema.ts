import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityCacheWhereUniqueInputObjectSchema as EntityCacheWhereUniqueInputObjectSchema } from './EntityCacheWhereUniqueInput.schema';
import { EntityCacheUpdateWithoutEntityInputObjectSchema as EntityCacheUpdateWithoutEntityInputObjectSchema } from './EntityCacheUpdateWithoutEntityInput.schema';
import { EntityCacheUncheckedUpdateWithoutEntityInputObjectSchema as EntityCacheUncheckedUpdateWithoutEntityInputObjectSchema } from './EntityCacheUncheckedUpdateWithoutEntityInput.schema';
import { EntityCacheCreateWithoutEntityInputObjectSchema as EntityCacheCreateWithoutEntityInputObjectSchema } from './EntityCacheCreateWithoutEntityInput.schema';
import { EntityCacheUncheckedCreateWithoutEntityInputObjectSchema as EntityCacheUncheckedCreateWithoutEntityInputObjectSchema } from './EntityCacheUncheckedCreateWithoutEntityInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => EntityCacheWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => EntityCacheUpdateWithoutEntityInputObjectSchema), z.lazy(() => EntityCacheUncheckedUpdateWithoutEntityInputObjectSchema)]),
  create: z.union([z.lazy(() => EntityCacheCreateWithoutEntityInputObjectSchema), z.lazy(() => EntityCacheUncheckedCreateWithoutEntityInputObjectSchema)])
}).strict();
export const EntityCacheUpsertWithWhereUniqueWithoutEntityInputObjectSchema: z.ZodType<Prisma.EntityCacheUpsertWithWhereUniqueWithoutEntityInput> = makeSchema() as unknown as z.ZodType<Prisma.EntityCacheUpsertWithWhereUniqueWithoutEntityInput>;
export const EntityCacheUpsertWithWhereUniqueWithoutEntityInputObjectZodSchema = makeSchema();
