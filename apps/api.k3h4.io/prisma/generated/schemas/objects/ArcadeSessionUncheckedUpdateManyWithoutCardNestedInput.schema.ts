import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeSessionCreateWithoutCardInputObjectSchema as ArcadeSessionCreateWithoutCardInputObjectSchema } from './ArcadeSessionCreateWithoutCardInput.schema';
import { ArcadeSessionUncheckedCreateWithoutCardInputObjectSchema as ArcadeSessionUncheckedCreateWithoutCardInputObjectSchema } from './ArcadeSessionUncheckedCreateWithoutCardInput.schema';
import { ArcadeSessionCreateOrConnectWithoutCardInputObjectSchema as ArcadeSessionCreateOrConnectWithoutCardInputObjectSchema } from './ArcadeSessionCreateOrConnectWithoutCardInput.schema';
import { ArcadeSessionUpsertWithWhereUniqueWithoutCardInputObjectSchema as ArcadeSessionUpsertWithWhereUniqueWithoutCardInputObjectSchema } from './ArcadeSessionUpsertWithWhereUniqueWithoutCardInput.schema';
import { ArcadeSessionCreateManyCardInputEnvelopeObjectSchema as ArcadeSessionCreateManyCardInputEnvelopeObjectSchema } from './ArcadeSessionCreateManyCardInputEnvelope.schema';
import { ArcadeSessionWhereUniqueInputObjectSchema as ArcadeSessionWhereUniqueInputObjectSchema } from './ArcadeSessionWhereUniqueInput.schema';
import { ArcadeSessionUpdateWithWhereUniqueWithoutCardInputObjectSchema as ArcadeSessionUpdateWithWhereUniqueWithoutCardInputObjectSchema } from './ArcadeSessionUpdateWithWhereUniqueWithoutCardInput.schema';
import { ArcadeSessionUpdateManyWithWhereWithoutCardInputObjectSchema as ArcadeSessionUpdateManyWithWhereWithoutCardInputObjectSchema } from './ArcadeSessionUpdateManyWithWhereWithoutCardInput.schema';
import { ArcadeSessionScalarWhereInputObjectSchema as ArcadeSessionScalarWhereInputObjectSchema } from './ArcadeSessionScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ArcadeSessionCreateWithoutCardInputObjectSchema), z.lazy(() => ArcadeSessionCreateWithoutCardInputObjectSchema).array(), z.lazy(() => ArcadeSessionUncheckedCreateWithoutCardInputObjectSchema), z.lazy(() => ArcadeSessionUncheckedCreateWithoutCardInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ArcadeSessionCreateOrConnectWithoutCardInputObjectSchema), z.lazy(() => ArcadeSessionCreateOrConnectWithoutCardInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ArcadeSessionUpsertWithWhereUniqueWithoutCardInputObjectSchema), z.lazy(() => ArcadeSessionUpsertWithWhereUniqueWithoutCardInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ArcadeSessionCreateManyCardInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema), z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema), z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema), z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema), z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ArcadeSessionUpdateWithWhereUniqueWithoutCardInputObjectSchema), z.lazy(() => ArcadeSessionUpdateWithWhereUniqueWithoutCardInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ArcadeSessionUpdateManyWithWhereWithoutCardInputObjectSchema), z.lazy(() => ArcadeSessionUpdateManyWithWhereWithoutCardInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ArcadeSessionScalarWhereInputObjectSchema), z.lazy(() => ArcadeSessionScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ArcadeSessionUncheckedUpdateManyWithoutCardNestedInputObjectSchema: z.ZodType<Prisma.ArcadeSessionUncheckedUpdateManyWithoutCardNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionUncheckedUpdateManyWithoutCardNestedInput>;
export const ArcadeSessionUncheckedUpdateManyWithoutCardNestedInputObjectZodSchema = makeSchema();
