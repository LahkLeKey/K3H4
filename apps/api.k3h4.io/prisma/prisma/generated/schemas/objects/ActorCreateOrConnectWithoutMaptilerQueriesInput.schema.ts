import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorWhereUniqueInputObjectSchema as ActorWhereUniqueInputObjectSchema } from './ActorWhereUniqueInput.schema';
import { ActorCreateWithoutMaptilerQueriesInputObjectSchema as ActorCreateWithoutMaptilerQueriesInputObjectSchema } from './ActorCreateWithoutMaptilerQueriesInput.schema';
import { ActorUncheckedCreateWithoutMaptilerQueriesInputObjectSchema as ActorUncheckedCreateWithoutMaptilerQueriesInputObjectSchema } from './ActorUncheckedCreateWithoutMaptilerQueriesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ActorWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ActorCreateWithoutMaptilerQueriesInputObjectSchema), z.lazy(() => ActorUncheckedCreateWithoutMaptilerQueriesInputObjectSchema)])
}).strict();
export const ActorCreateOrConnectWithoutMaptilerQueriesInputObjectSchema: z.ZodType<Prisma.ActorCreateOrConnectWithoutMaptilerQueriesInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorCreateOrConnectWithoutMaptilerQueriesInput>;
export const ActorCreateOrConnectWithoutMaptilerQueriesInputObjectZodSchema = makeSchema();
