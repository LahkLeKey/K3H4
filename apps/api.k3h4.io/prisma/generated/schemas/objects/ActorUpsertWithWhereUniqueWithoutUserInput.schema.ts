import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorWhereUniqueInputObjectSchema as ActorWhereUniqueInputObjectSchema } from './ActorWhereUniqueInput.schema';
import { ActorUpdateWithoutUserInputObjectSchema as ActorUpdateWithoutUserInputObjectSchema } from './ActorUpdateWithoutUserInput.schema';
import { ActorUncheckedUpdateWithoutUserInputObjectSchema as ActorUncheckedUpdateWithoutUserInputObjectSchema } from './ActorUncheckedUpdateWithoutUserInput.schema';
import { ActorCreateWithoutUserInputObjectSchema as ActorCreateWithoutUserInputObjectSchema } from './ActorCreateWithoutUserInput.schema';
import { ActorUncheckedCreateWithoutUserInputObjectSchema as ActorUncheckedCreateWithoutUserInputObjectSchema } from './ActorUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ActorWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ActorUpdateWithoutUserInputObjectSchema), z.lazy(() => ActorUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => ActorCreateWithoutUserInputObjectSchema), z.lazy(() => ActorUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const ActorUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.ActorUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorUpsertWithWhereUniqueWithoutUserInput>;
export const ActorUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
