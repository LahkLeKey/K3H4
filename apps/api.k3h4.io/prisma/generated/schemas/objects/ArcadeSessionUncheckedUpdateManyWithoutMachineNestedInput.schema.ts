import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeSessionCreateWithoutMachineInputObjectSchema as ArcadeSessionCreateWithoutMachineInputObjectSchema } from './ArcadeSessionCreateWithoutMachineInput.schema';
import { ArcadeSessionUncheckedCreateWithoutMachineInputObjectSchema as ArcadeSessionUncheckedCreateWithoutMachineInputObjectSchema } from './ArcadeSessionUncheckedCreateWithoutMachineInput.schema';
import { ArcadeSessionCreateOrConnectWithoutMachineInputObjectSchema as ArcadeSessionCreateOrConnectWithoutMachineInputObjectSchema } from './ArcadeSessionCreateOrConnectWithoutMachineInput.schema';
import { ArcadeSessionUpsertWithWhereUniqueWithoutMachineInputObjectSchema as ArcadeSessionUpsertWithWhereUniqueWithoutMachineInputObjectSchema } from './ArcadeSessionUpsertWithWhereUniqueWithoutMachineInput.schema';
import { ArcadeSessionCreateManyMachineInputEnvelopeObjectSchema as ArcadeSessionCreateManyMachineInputEnvelopeObjectSchema } from './ArcadeSessionCreateManyMachineInputEnvelope.schema';
import { ArcadeSessionWhereUniqueInputObjectSchema as ArcadeSessionWhereUniqueInputObjectSchema } from './ArcadeSessionWhereUniqueInput.schema';
import { ArcadeSessionUpdateWithWhereUniqueWithoutMachineInputObjectSchema as ArcadeSessionUpdateWithWhereUniqueWithoutMachineInputObjectSchema } from './ArcadeSessionUpdateWithWhereUniqueWithoutMachineInput.schema';
import { ArcadeSessionUpdateManyWithWhereWithoutMachineInputObjectSchema as ArcadeSessionUpdateManyWithWhereWithoutMachineInputObjectSchema } from './ArcadeSessionUpdateManyWithWhereWithoutMachineInput.schema';
import { ArcadeSessionScalarWhereInputObjectSchema as ArcadeSessionScalarWhereInputObjectSchema } from './ArcadeSessionScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ArcadeSessionCreateWithoutMachineInputObjectSchema), z.lazy(() => ArcadeSessionCreateWithoutMachineInputObjectSchema).array(), z.lazy(() => ArcadeSessionUncheckedCreateWithoutMachineInputObjectSchema), z.lazy(() => ArcadeSessionUncheckedCreateWithoutMachineInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ArcadeSessionCreateOrConnectWithoutMachineInputObjectSchema), z.lazy(() => ArcadeSessionCreateOrConnectWithoutMachineInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ArcadeSessionUpsertWithWhereUniqueWithoutMachineInputObjectSchema), z.lazy(() => ArcadeSessionUpsertWithWhereUniqueWithoutMachineInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ArcadeSessionCreateManyMachineInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema), z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema), z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema), z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema), z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ArcadeSessionUpdateWithWhereUniqueWithoutMachineInputObjectSchema), z.lazy(() => ArcadeSessionUpdateWithWhereUniqueWithoutMachineInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ArcadeSessionUpdateManyWithWhereWithoutMachineInputObjectSchema), z.lazy(() => ArcadeSessionUpdateManyWithWhereWithoutMachineInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ArcadeSessionScalarWhereInputObjectSchema), z.lazy(() => ArcadeSessionScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ArcadeSessionUncheckedUpdateManyWithoutMachineNestedInputObjectSchema: z.ZodType<Prisma.ArcadeSessionUncheckedUpdateManyWithoutMachineNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionUncheckedUpdateManyWithoutMachineNestedInput>;
export const ArcadeSessionUncheckedUpdateManyWithoutMachineNestedInputObjectZodSchema = makeSchema();
