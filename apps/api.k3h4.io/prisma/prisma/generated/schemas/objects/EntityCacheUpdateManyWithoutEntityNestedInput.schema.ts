import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityCacheCreateWithoutEntityInputObjectSchema as EntityCacheCreateWithoutEntityInputObjectSchema } from './EntityCacheCreateWithoutEntityInput.schema';
import { EntityCacheUncheckedCreateWithoutEntityInputObjectSchema as EntityCacheUncheckedCreateWithoutEntityInputObjectSchema } from './EntityCacheUncheckedCreateWithoutEntityInput.schema';
import { EntityCacheCreateOrConnectWithoutEntityInputObjectSchema as EntityCacheCreateOrConnectWithoutEntityInputObjectSchema } from './EntityCacheCreateOrConnectWithoutEntityInput.schema';
import { EntityCacheUpsertWithWhereUniqueWithoutEntityInputObjectSchema as EntityCacheUpsertWithWhereUniqueWithoutEntityInputObjectSchema } from './EntityCacheUpsertWithWhereUniqueWithoutEntityInput.schema';
import { EntityCacheCreateManyEntityInputEnvelopeObjectSchema as EntityCacheCreateManyEntityInputEnvelopeObjectSchema } from './EntityCacheCreateManyEntityInputEnvelope.schema';
import { EntityCacheWhereUniqueInputObjectSchema as EntityCacheWhereUniqueInputObjectSchema } from './EntityCacheWhereUniqueInput.schema';
import { EntityCacheUpdateWithWhereUniqueWithoutEntityInputObjectSchema as EntityCacheUpdateWithWhereUniqueWithoutEntityInputObjectSchema } from './EntityCacheUpdateWithWhereUniqueWithoutEntityInput.schema';
import { EntityCacheUpdateManyWithWhereWithoutEntityInputObjectSchema as EntityCacheUpdateManyWithWhereWithoutEntityInputObjectSchema } from './EntityCacheUpdateManyWithWhereWithoutEntityInput.schema';
import { EntityCacheScalarWhereInputObjectSchema as EntityCacheScalarWhereInputObjectSchema } from './EntityCacheScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => EntityCacheCreateWithoutEntityInputObjectSchema), z.lazy(() => EntityCacheCreateWithoutEntityInputObjectSchema).array(), z.lazy(() => EntityCacheUncheckedCreateWithoutEntityInputObjectSchema), z.lazy(() => EntityCacheUncheckedCreateWithoutEntityInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => EntityCacheCreateOrConnectWithoutEntityInputObjectSchema), z.lazy(() => EntityCacheCreateOrConnectWithoutEntityInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => EntityCacheUpsertWithWhereUniqueWithoutEntityInputObjectSchema), z.lazy(() => EntityCacheUpsertWithWhereUniqueWithoutEntityInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => EntityCacheCreateManyEntityInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => EntityCacheWhereUniqueInputObjectSchema), z.lazy(() => EntityCacheWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => EntityCacheWhereUniqueInputObjectSchema), z.lazy(() => EntityCacheWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => EntityCacheWhereUniqueInputObjectSchema), z.lazy(() => EntityCacheWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => EntityCacheWhereUniqueInputObjectSchema), z.lazy(() => EntityCacheWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => EntityCacheUpdateWithWhereUniqueWithoutEntityInputObjectSchema), z.lazy(() => EntityCacheUpdateWithWhereUniqueWithoutEntityInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => EntityCacheUpdateManyWithWhereWithoutEntityInputObjectSchema), z.lazy(() => EntityCacheUpdateManyWithWhereWithoutEntityInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => EntityCacheScalarWhereInputObjectSchema), z.lazy(() => EntityCacheScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const EntityCacheUpdateManyWithoutEntityNestedInputObjectSchema: z.ZodType<Prisma.EntityCacheUpdateManyWithoutEntityNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.EntityCacheUpdateManyWithoutEntityNestedInput>;
export const EntityCacheUpdateManyWithoutEntityNestedInputObjectZodSchema = makeSchema();
