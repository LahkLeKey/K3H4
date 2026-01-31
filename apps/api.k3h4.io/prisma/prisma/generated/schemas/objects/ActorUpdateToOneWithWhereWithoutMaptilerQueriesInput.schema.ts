import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorWhereInputObjectSchema as ActorWhereInputObjectSchema } from './ActorWhereInput.schema';
import { ActorUpdateWithoutMaptilerQueriesInputObjectSchema as ActorUpdateWithoutMaptilerQueriesInputObjectSchema } from './ActorUpdateWithoutMaptilerQueriesInput.schema';
import { ActorUncheckedUpdateWithoutMaptilerQueriesInputObjectSchema as ActorUncheckedUpdateWithoutMaptilerQueriesInputObjectSchema } from './ActorUncheckedUpdateWithoutMaptilerQueriesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ActorWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ActorUpdateWithoutMaptilerQueriesInputObjectSchema), z.lazy(() => ActorUncheckedUpdateWithoutMaptilerQueriesInputObjectSchema)])
}).strict();
export const ActorUpdateToOneWithWhereWithoutMaptilerQueriesInputObjectSchema: z.ZodType<Prisma.ActorUpdateToOneWithWhereWithoutMaptilerQueriesInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorUpdateToOneWithWhereWithoutMaptilerQueriesInput>;
export const ActorUpdateToOneWithWhereWithoutMaptilerQueriesInputObjectZodSchema = makeSchema();
