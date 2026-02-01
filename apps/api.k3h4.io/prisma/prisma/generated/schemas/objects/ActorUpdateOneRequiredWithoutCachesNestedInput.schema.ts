import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorCreateWithoutCachesInputObjectSchema as ActorCreateWithoutCachesInputObjectSchema } from './ActorCreateWithoutCachesInput.schema';
import { ActorUncheckedCreateWithoutCachesInputObjectSchema as ActorUncheckedCreateWithoutCachesInputObjectSchema } from './ActorUncheckedCreateWithoutCachesInput.schema';
import { ActorCreateOrConnectWithoutCachesInputObjectSchema as ActorCreateOrConnectWithoutCachesInputObjectSchema } from './ActorCreateOrConnectWithoutCachesInput.schema';
import { ActorUpsertWithoutCachesInputObjectSchema as ActorUpsertWithoutCachesInputObjectSchema } from './ActorUpsertWithoutCachesInput.schema';
import { ActorWhereUniqueInputObjectSchema as ActorWhereUniqueInputObjectSchema } from './ActorWhereUniqueInput.schema';
import { ActorUpdateToOneWithWhereWithoutCachesInputObjectSchema as ActorUpdateToOneWithWhereWithoutCachesInputObjectSchema } from './ActorUpdateToOneWithWhereWithoutCachesInput.schema';
import { ActorUpdateWithoutCachesInputObjectSchema as ActorUpdateWithoutCachesInputObjectSchema } from './ActorUpdateWithoutCachesInput.schema';
import { ActorUncheckedUpdateWithoutCachesInputObjectSchema as ActorUncheckedUpdateWithoutCachesInputObjectSchema } from './ActorUncheckedUpdateWithoutCachesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ActorCreateWithoutCachesInputObjectSchema), z.lazy(() => ActorUncheckedCreateWithoutCachesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ActorCreateOrConnectWithoutCachesInputObjectSchema).optional(),
  upsert: z.lazy(() => ActorUpsertWithoutCachesInputObjectSchema).optional(),
  connect: z.lazy(() => ActorWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ActorUpdateToOneWithWhereWithoutCachesInputObjectSchema), z.lazy(() => ActorUpdateWithoutCachesInputObjectSchema), z.lazy(() => ActorUncheckedUpdateWithoutCachesInputObjectSchema)]).optional()
}).strict();
export const ActorUpdateOneRequiredWithoutCachesNestedInputObjectSchema: z.ZodType<Prisma.ActorUpdateOneRequiredWithoutCachesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorUpdateOneRequiredWithoutCachesNestedInput>;
export const ActorUpdateOneRequiredWithoutCachesNestedInputObjectZodSchema = makeSchema();
