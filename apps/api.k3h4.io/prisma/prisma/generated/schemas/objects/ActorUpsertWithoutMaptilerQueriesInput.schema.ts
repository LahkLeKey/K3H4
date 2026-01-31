import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorUpdateWithoutMaptilerQueriesInputObjectSchema as ActorUpdateWithoutMaptilerQueriesInputObjectSchema } from './ActorUpdateWithoutMaptilerQueriesInput.schema';
import { ActorUncheckedUpdateWithoutMaptilerQueriesInputObjectSchema as ActorUncheckedUpdateWithoutMaptilerQueriesInputObjectSchema } from './ActorUncheckedUpdateWithoutMaptilerQueriesInput.schema';
import { ActorCreateWithoutMaptilerQueriesInputObjectSchema as ActorCreateWithoutMaptilerQueriesInputObjectSchema } from './ActorCreateWithoutMaptilerQueriesInput.schema';
import { ActorUncheckedCreateWithoutMaptilerQueriesInputObjectSchema as ActorUncheckedCreateWithoutMaptilerQueriesInputObjectSchema } from './ActorUncheckedCreateWithoutMaptilerQueriesInput.schema';
import { ActorWhereInputObjectSchema as ActorWhereInputObjectSchema } from './ActorWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ActorUpdateWithoutMaptilerQueriesInputObjectSchema), z.lazy(() => ActorUncheckedUpdateWithoutMaptilerQueriesInputObjectSchema)]),
  create: z.union([z.lazy(() => ActorCreateWithoutMaptilerQueriesInputObjectSchema), z.lazy(() => ActorUncheckedCreateWithoutMaptilerQueriesInputObjectSchema)]),
  where: z.lazy(() => ActorWhereInputObjectSchema).optional()
}).strict();
export const ActorUpsertWithoutMaptilerQueriesInputObjectSchema: z.ZodType<Prisma.ActorUpsertWithoutMaptilerQueriesInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorUpsertWithoutMaptilerQueriesInput>;
export const ActorUpsertWithoutMaptilerQueriesInputObjectZodSchema = makeSchema();
