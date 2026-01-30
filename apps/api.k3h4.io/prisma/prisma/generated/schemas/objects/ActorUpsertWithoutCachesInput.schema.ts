import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorUpdateWithoutCachesInputObjectSchema as ActorUpdateWithoutCachesInputObjectSchema } from './ActorUpdateWithoutCachesInput.schema';
import { ActorUncheckedUpdateWithoutCachesInputObjectSchema as ActorUncheckedUpdateWithoutCachesInputObjectSchema } from './ActorUncheckedUpdateWithoutCachesInput.schema';
import { ActorCreateWithoutCachesInputObjectSchema as ActorCreateWithoutCachesInputObjectSchema } from './ActorCreateWithoutCachesInput.schema';
import { ActorUncheckedCreateWithoutCachesInputObjectSchema as ActorUncheckedCreateWithoutCachesInputObjectSchema } from './ActorUncheckedCreateWithoutCachesInput.schema';
import { ActorWhereInputObjectSchema as ActorWhereInputObjectSchema } from './ActorWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ActorUpdateWithoutCachesInputObjectSchema), z.lazy(() => ActorUncheckedUpdateWithoutCachesInputObjectSchema)]),
  create: z.union([z.lazy(() => ActorCreateWithoutCachesInputObjectSchema), z.lazy(() => ActorUncheckedCreateWithoutCachesInputObjectSchema)]),
  where: z.lazy(() => ActorWhereInputObjectSchema).optional()
}).strict();
export const ActorUpsertWithoutCachesInputObjectSchema: z.ZodType<Prisma.ActorUpsertWithoutCachesInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorUpsertWithoutCachesInput>;
export const ActorUpsertWithoutCachesInputObjectZodSchema = makeSchema();
