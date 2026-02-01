import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityCacheCreateWithoutEntityInputObjectSchema as EntityCacheCreateWithoutEntityInputObjectSchema } from './EntityCacheCreateWithoutEntityInput.schema';
import { EntityCacheUncheckedCreateWithoutEntityInputObjectSchema as EntityCacheUncheckedCreateWithoutEntityInputObjectSchema } from './EntityCacheUncheckedCreateWithoutEntityInput.schema';
import { EntityCacheCreateOrConnectWithoutEntityInputObjectSchema as EntityCacheCreateOrConnectWithoutEntityInputObjectSchema } from './EntityCacheCreateOrConnectWithoutEntityInput.schema';
import { EntityCacheCreateManyEntityInputEnvelopeObjectSchema as EntityCacheCreateManyEntityInputEnvelopeObjectSchema } from './EntityCacheCreateManyEntityInputEnvelope.schema';
import { EntityCacheWhereUniqueInputObjectSchema as EntityCacheWhereUniqueInputObjectSchema } from './EntityCacheWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => EntityCacheCreateWithoutEntityInputObjectSchema), z.lazy(() => EntityCacheCreateWithoutEntityInputObjectSchema).array(), z.lazy(() => EntityCacheUncheckedCreateWithoutEntityInputObjectSchema), z.lazy(() => EntityCacheUncheckedCreateWithoutEntityInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => EntityCacheCreateOrConnectWithoutEntityInputObjectSchema), z.lazy(() => EntityCacheCreateOrConnectWithoutEntityInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => EntityCacheCreateManyEntityInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => EntityCacheWhereUniqueInputObjectSchema), z.lazy(() => EntityCacheWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const EntityCacheCreateNestedManyWithoutEntityInputObjectSchema: z.ZodType<Prisma.EntityCacheCreateNestedManyWithoutEntityInput> = makeSchema() as unknown as z.ZodType<Prisma.EntityCacheCreateNestedManyWithoutEntityInput>;
export const EntityCacheCreateNestedManyWithoutEntityInputObjectZodSchema = makeSchema();
