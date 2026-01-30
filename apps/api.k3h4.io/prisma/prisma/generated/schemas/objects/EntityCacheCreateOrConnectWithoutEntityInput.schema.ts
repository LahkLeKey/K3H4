import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityCacheWhereUniqueInputObjectSchema as EntityCacheWhereUniqueInputObjectSchema } from './EntityCacheWhereUniqueInput.schema';
import { EntityCacheCreateWithoutEntityInputObjectSchema as EntityCacheCreateWithoutEntityInputObjectSchema } from './EntityCacheCreateWithoutEntityInput.schema';
import { EntityCacheUncheckedCreateWithoutEntityInputObjectSchema as EntityCacheUncheckedCreateWithoutEntityInputObjectSchema } from './EntityCacheUncheckedCreateWithoutEntityInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => EntityCacheWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => EntityCacheCreateWithoutEntityInputObjectSchema), z.lazy(() => EntityCacheUncheckedCreateWithoutEntityInputObjectSchema)])
}).strict();
export const EntityCacheCreateOrConnectWithoutEntityInputObjectSchema: z.ZodType<Prisma.EntityCacheCreateOrConnectWithoutEntityInput> = makeSchema() as unknown as z.ZodType<Prisma.EntityCacheCreateOrConnectWithoutEntityInput>;
export const EntityCacheCreateOrConnectWithoutEntityInputObjectZodSchema = makeSchema();
