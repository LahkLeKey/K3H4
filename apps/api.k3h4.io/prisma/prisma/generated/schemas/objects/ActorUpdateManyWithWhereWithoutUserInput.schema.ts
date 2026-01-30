import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorScalarWhereInputObjectSchema as ActorScalarWhereInputObjectSchema } from './ActorScalarWhereInput.schema';
import { ActorUpdateManyMutationInputObjectSchema as ActorUpdateManyMutationInputObjectSchema } from './ActorUpdateManyMutationInput.schema';
import { ActorUncheckedUpdateManyWithoutUserInputObjectSchema as ActorUncheckedUpdateManyWithoutUserInputObjectSchema } from './ActorUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ActorScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ActorUpdateManyMutationInputObjectSchema), z.lazy(() => ActorUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const ActorUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.ActorUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorUpdateManyWithWhereWithoutUserInput>;
export const ActorUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
