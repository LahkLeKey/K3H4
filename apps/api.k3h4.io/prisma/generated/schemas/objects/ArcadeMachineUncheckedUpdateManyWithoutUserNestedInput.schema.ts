import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeMachineCreateWithoutUserInputObjectSchema as ArcadeMachineCreateWithoutUserInputObjectSchema } from './ArcadeMachineCreateWithoutUserInput.schema';
import { ArcadeMachineUncheckedCreateWithoutUserInputObjectSchema as ArcadeMachineUncheckedCreateWithoutUserInputObjectSchema } from './ArcadeMachineUncheckedCreateWithoutUserInput.schema';
import { ArcadeMachineCreateOrConnectWithoutUserInputObjectSchema as ArcadeMachineCreateOrConnectWithoutUserInputObjectSchema } from './ArcadeMachineCreateOrConnectWithoutUserInput.schema';
import { ArcadeMachineUpsertWithWhereUniqueWithoutUserInputObjectSchema as ArcadeMachineUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './ArcadeMachineUpsertWithWhereUniqueWithoutUserInput.schema';
import { ArcadeMachineCreateManyUserInputEnvelopeObjectSchema as ArcadeMachineCreateManyUserInputEnvelopeObjectSchema } from './ArcadeMachineCreateManyUserInputEnvelope.schema';
import { ArcadeMachineWhereUniqueInputObjectSchema as ArcadeMachineWhereUniqueInputObjectSchema } from './ArcadeMachineWhereUniqueInput.schema';
import { ArcadeMachineUpdateWithWhereUniqueWithoutUserInputObjectSchema as ArcadeMachineUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './ArcadeMachineUpdateWithWhereUniqueWithoutUserInput.schema';
import { ArcadeMachineUpdateManyWithWhereWithoutUserInputObjectSchema as ArcadeMachineUpdateManyWithWhereWithoutUserInputObjectSchema } from './ArcadeMachineUpdateManyWithWhereWithoutUserInput.schema';
import { ArcadeMachineScalarWhereInputObjectSchema as ArcadeMachineScalarWhereInputObjectSchema } from './ArcadeMachineScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ArcadeMachineCreateWithoutUserInputObjectSchema), z.lazy(() => ArcadeMachineCreateWithoutUserInputObjectSchema).array(), z.lazy(() => ArcadeMachineUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => ArcadeMachineUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ArcadeMachineCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => ArcadeMachineCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ArcadeMachineUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => ArcadeMachineUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ArcadeMachineCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ArcadeMachineWhereUniqueInputObjectSchema), z.lazy(() => ArcadeMachineWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ArcadeMachineWhereUniqueInputObjectSchema), z.lazy(() => ArcadeMachineWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ArcadeMachineWhereUniqueInputObjectSchema), z.lazy(() => ArcadeMachineWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ArcadeMachineWhereUniqueInputObjectSchema), z.lazy(() => ArcadeMachineWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ArcadeMachineUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => ArcadeMachineUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ArcadeMachineUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => ArcadeMachineUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ArcadeMachineScalarWhereInputObjectSchema), z.lazy(() => ArcadeMachineScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ArcadeMachineUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.ArcadeMachineUncheckedUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeMachineUncheckedUpdateManyWithoutUserNestedInput>;
export const ArcadeMachineUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
