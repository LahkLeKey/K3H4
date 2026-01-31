import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorCreateWithoutMaptilerQueriesInputObjectSchema as ActorCreateWithoutMaptilerQueriesInputObjectSchema } from './ActorCreateWithoutMaptilerQueriesInput.schema';
import { ActorUncheckedCreateWithoutMaptilerQueriesInputObjectSchema as ActorUncheckedCreateWithoutMaptilerQueriesInputObjectSchema } from './ActorUncheckedCreateWithoutMaptilerQueriesInput.schema';
import { ActorCreateOrConnectWithoutMaptilerQueriesInputObjectSchema as ActorCreateOrConnectWithoutMaptilerQueriesInputObjectSchema } from './ActorCreateOrConnectWithoutMaptilerQueriesInput.schema';
import { ActorWhereUniqueInputObjectSchema as ActorWhereUniqueInputObjectSchema } from './ActorWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ActorCreateWithoutMaptilerQueriesInputObjectSchema), z.lazy(() => ActorUncheckedCreateWithoutMaptilerQueriesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ActorCreateOrConnectWithoutMaptilerQueriesInputObjectSchema).optional(),
  connect: z.lazy(() => ActorWhereUniqueInputObjectSchema).optional()
}).strict();
export const ActorCreateNestedOneWithoutMaptilerQueriesInputObjectSchema: z.ZodType<Prisma.ActorCreateNestedOneWithoutMaptilerQueriesInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorCreateNestedOneWithoutMaptilerQueriesInput>;
export const ActorCreateNestedOneWithoutMaptilerQueriesInputObjectZodSchema = makeSchema();
