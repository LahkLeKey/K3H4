import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityUpdateWithoutCachesInputObjectSchema as EntityUpdateWithoutCachesInputObjectSchema } from './EntityUpdateWithoutCachesInput.schema';
import { EntityUncheckedUpdateWithoutCachesInputObjectSchema as EntityUncheckedUpdateWithoutCachesInputObjectSchema } from './EntityUncheckedUpdateWithoutCachesInput.schema';
import { EntityCreateWithoutCachesInputObjectSchema as EntityCreateWithoutCachesInputObjectSchema } from './EntityCreateWithoutCachesInput.schema';
import { EntityUncheckedCreateWithoutCachesInputObjectSchema as EntityUncheckedCreateWithoutCachesInputObjectSchema } from './EntityUncheckedCreateWithoutCachesInput.schema';
import { EntityWhereInputObjectSchema as EntityWhereInputObjectSchema } from './EntityWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => EntityUpdateWithoutCachesInputObjectSchema), z.lazy(() => EntityUncheckedUpdateWithoutCachesInputObjectSchema)]),
  create: z.union([z.lazy(() => EntityCreateWithoutCachesInputObjectSchema), z.lazy(() => EntityUncheckedCreateWithoutCachesInputObjectSchema)]),
  where: z.lazy(() => EntityWhereInputObjectSchema).optional()
}).strict();
export const EntityUpsertWithoutCachesInputObjectSchema: z.ZodType<Prisma.EntityUpsertWithoutCachesInput> = makeSchema() as unknown as z.ZodType<Prisma.EntityUpsertWithoutCachesInput>;
export const EntityUpsertWithoutCachesInputObjectZodSchema = makeSchema();
