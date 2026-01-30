import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorWhereUniqueInputObjectSchema as ActorWhereUniqueInputObjectSchema } from './ActorWhereUniqueInput.schema';
import { ActorUpdateWithoutUserInputObjectSchema as ActorUpdateWithoutUserInputObjectSchema } from './ActorUpdateWithoutUserInput.schema';
import { ActorUncheckedUpdateWithoutUserInputObjectSchema as ActorUncheckedUpdateWithoutUserInputObjectSchema } from './ActorUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ActorWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ActorUpdateWithoutUserInputObjectSchema), z.lazy(() => ActorUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const ActorUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.ActorUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorUpdateWithWhereUniqueWithoutUserInput>;
export const ActorUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
