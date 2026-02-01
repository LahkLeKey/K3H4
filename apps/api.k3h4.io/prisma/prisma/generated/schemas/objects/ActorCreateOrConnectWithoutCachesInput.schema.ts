import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorWhereUniqueInputObjectSchema as ActorWhereUniqueInputObjectSchema } from './ActorWhereUniqueInput.schema';
import { ActorCreateWithoutCachesInputObjectSchema as ActorCreateWithoutCachesInputObjectSchema } from './ActorCreateWithoutCachesInput.schema';
import { ActorUncheckedCreateWithoutCachesInputObjectSchema as ActorUncheckedCreateWithoutCachesInputObjectSchema } from './ActorUncheckedCreateWithoutCachesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ActorWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ActorCreateWithoutCachesInputObjectSchema), z.lazy(() => ActorUncheckedCreateWithoutCachesInputObjectSchema)])
}).strict();
export const ActorCreateOrConnectWithoutCachesInputObjectSchema: z.ZodType<Prisma.ActorCreateOrConnectWithoutCachesInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorCreateOrConnectWithoutCachesInput>;
export const ActorCreateOrConnectWithoutCachesInputObjectZodSchema = makeSchema();
