import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorWhereUniqueInputObjectSchema as ActorWhereUniqueInputObjectSchema } from './ActorWhereUniqueInput.schema';
import { ActorCreateWithoutUserInputObjectSchema as ActorCreateWithoutUserInputObjectSchema } from './ActorCreateWithoutUserInput.schema';
import { ActorUncheckedCreateWithoutUserInputObjectSchema as ActorUncheckedCreateWithoutUserInputObjectSchema } from './ActorUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ActorWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ActorCreateWithoutUserInputObjectSchema), z.lazy(() => ActorUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const ActorCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.ActorCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorCreateOrConnectWithoutUserInput>;
export const ActorCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
