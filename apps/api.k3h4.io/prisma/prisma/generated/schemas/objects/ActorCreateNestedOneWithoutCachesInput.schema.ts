import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorCreateWithoutCachesInputObjectSchema as ActorCreateWithoutCachesInputObjectSchema } from './ActorCreateWithoutCachesInput.schema';
import { ActorUncheckedCreateWithoutCachesInputObjectSchema as ActorUncheckedCreateWithoutCachesInputObjectSchema } from './ActorUncheckedCreateWithoutCachesInput.schema';
import { ActorCreateOrConnectWithoutCachesInputObjectSchema as ActorCreateOrConnectWithoutCachesInputObjectSchema } from './ActorCreateOrConnectWithoutCachesInput.schema';
import { ActorWhereUniqueInputObjectSchema as ActorWhereUniqueInputObjectSchema } from './ActorWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ActorCreateWithoutCachesInputObjectSchema), z.lazy(() => ActorUncheckedCreateWithoutCachesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ActorCreateOrConnectWithoutCachesInputObjectSchema).optional(),
  connect: z.lazy(() => ActorWhereUniqueInputObjectSchema).optional()
}).strict();
export const ActorCreateNestedOneWithoutCachesInputObjectSchema: z.ZodType<Prisma.ActorCreateNestedOneWithoutCachesInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorCreateNestedOneWithoutCachesInput>;
export const ActorCreateNestedOneWithoutCachesInputObjectZodSchema = makeSchema();
