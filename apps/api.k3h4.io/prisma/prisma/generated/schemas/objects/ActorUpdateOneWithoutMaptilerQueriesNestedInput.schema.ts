import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorCreateWithoutMaptilerQueriesInputObjectSchema as ActorCreateWithoutMaptilerQueriesInputObjectSchema } from './ActorCreateWithoutMaptilerQueriesInput.schema';
import { ActorUncheckedCreateWithoutMaptilerQueriesInputObjectSchema as ActorUncheckedCreateWithoutMaptilerQueriesInputObjectSchema } from './ActorUncheckedCreateWithoutMaptilerQueriesInput.schema';
import { ActorCreateOrConnectWithoutMaptilerQueriesInputObjectSchema as ActorCreateOrConnectWithoutMaptilerQueriesInputObjectSchema } from './ActorCreateOrConnectWithoutMaptilerQueriesInput.schema';
import { ActorUpsertWithoutMaptilerQueriesInputObjectSchema as ActorUpsertWithoutMaptilerQueriesInputObjectSchema } from './ActorUpsertWithoutMaptilerQueriesInput.schema';
import { ActorWhereInputObjectSchema as ActorWhereInputObjectSchema } from './ActorWhereInput.schema';
import { ActorWhereUniqueInputObjectSchema as ActorWhereUniqueInputObjectSchema } from './ActorWhereUniqueInput.schema';
import { ActorUpdateToOneWithWhereWithoutMaptilerQueriesInputObjectSchema as ActorUpdateToOneWithWhereWithoutMaptilerQueriesInputObjectSchema } from './ActorUpdateToOneWithWhereWithoutMaptilerQueriesInput.schema';
import { ActorUpdateWithoutMaptilerQueriesInputObjectSchema as ActorUpdateWithoutMaptilerQueriesInputObjectSchema } from './ActorUpdateWithoutMaptilerQueriesInput.schema';
import { ActorUncheckedUpdateWithoutMaptilerQueriesInputObjectSchema as ActorUncheckedUpdateWithoutMaptilerQueriesInputObjectSchema } from './ActorUncheckedUpdateWithoutMaptilerQueriesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ActorCreateWithoutMaptilerQueriesInputObjectSchema), z.lazy(() => ActorUncheckedCreateWithoutMaptilerQueriesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ActorCreateOrConnectWithoutMaptilerQueriesInputObjectSchema).optional(),
  upsert: z.lazy(() => ActorUpsertWithoutMaptilerQueriesInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => ActorWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => ActorWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => ActorWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ActorUpdateToOneWithWhereWithoutMaptilerQueriesInputObjectSchema), z.lazy(() => ActorUpdateWithoutMaptilerQueriesInputObjectSchema), z.lazy(() => ActorUncheckedUpdateWithoutMaptilerQueriesInputObjectSchema)]).optional()
}).strict();
export const ActorUpdateOneWithoutMaptilerQueriesNestedInputObjectSchema: z.ZodType<Prisma.ActorUpdateOneWithoutMaptilerQueriesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorUpdateOneWithoutMaptilerQueriesNestedInput>;
export const ActorUpdateOneWithoutMaptilerQueriesNestedInputObjectZodSchema = makeSchema();
