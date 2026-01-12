import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeMachineCreateWithoutUserInputObjectSchema as ArcadeMachineCreateWithoutUserInputObjectSchema } from './ArcadeMachineCreateWithoutUserInput.schema';
import { ArcadeMachineUncheckedCreateWithoutUserInputObjectSchema as ArcadeMachineUncheckedCreateWithoutUserInputObjectSchema } from './ArcadeMachineUncheckedCreateWithoutUserInput.schema';
import { ArcadeMachineCreateOrConnectWithoutUserInputObjectSchema as ArcadeMachineCreateOrConnectWithoutUserInputObjectSchema } from './ArcadeMachineCreateOrConnectWithoutUserInput.schema';
import { ArcadeMachineCreateManyUserInputEnvelopeObjectSchema as ArcadeMachineCreateManyUserInputEnvelopeObjectSchema } from './ArcadeMachineCreateManyUserInputEnvelope.schema';
import { ArcadeMachineWhereUniqueInputObjectSchema as ArcadeMachineWhereUniqueInputObjectSchema } from './ArcadeMachineWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ArcadeMachineCreateWithoutUserInputObjectSchema), z.lazy(() => ArcadeMachineCreateWithoutUserInputObjectSchema).array(), z.lazy(() => ArcadeMachineUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => ArcadeMachineUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ArcadeMachineCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => ArcadeMachineCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ArcadeMachineCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ArcadeMachineWhereUniqueInputObjectSchema), z.lazy(() => ArcadeMachineWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ArcadeMachineCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.ArcadeMachineCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeMachineCreateNestedManyWithoutUserInput>;
export const ArcadeMachineCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
