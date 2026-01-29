import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorCreateWithoutUserInputObjectSchema as ActorCreateWithoutUserInputObjectSchema } from './ActorCreateWithoutUserInput.schema';
import { ActorUncheckedCreateWithoutUserInputObjectSchema as ActorUncheckedCreateWithoutUserInputObjectSchema } from './ActorUncheckedCreateWithoutUserInput.schema';
import { ActorCreateOrConnectWithoutUserInputObjectSchema as ActorCreateOrConnectWithoutUserInputObjectSchema } from './ActorCreateOrConnectWithoutUserInput.schema';
import { ActorCreateManyUserInputEnvelopeObjectSchema as ActorCreateManyUserInputEnvelopeObjectSchema } from './ActorCreateManyUserInputEnvelope.schema';
import { ActorWhereUniqueInputObjectSchema as ActorWhereUniqueInputObjectSchema } from './ActorWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ActorCreateWithoutUserInputObjectSchema), z.lazy(() => ActorCreateWithoutUserInputObjectSchema).array(), z.lazy(() => ActorUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => ActorUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ActorCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => ActorCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ActorCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ActorWhereUniqueInputObjectSchema), z.lazy(() => ActorWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ActorUncheckedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.ActorUncheckedCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorUncheckedCreateNestedManyWithoutUserInput>;
export const ActorUncheckedCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
