import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeTopUpCreateWithoutCardInputObjectSchema as ArcadeTopUpCreateWithoutCardInputObjectSchema } from './ArcadeTopUpCreateWithoutCardInput.schema';
import { ArcadeTopUpUncheckedCreateWithoutCardInputObjectSchema as ArcadeTopUpUncheckedCreateWithoutCardInputObjectSchema } from './ArcadeTopUpUncheckedCreateWithoutCardInput.schema';
import { ArcadeTopUpCreateOrConnectWithoutCardInputObjectSchema as ArcadeTopUpCreateOrConnectWithoutCardInputObjectSchema } from './ArcadeTopUpCreateOrConnectWithoutCardInput.schema';
import { ArcadeTopUpUpsertWithWhereUniqueWithoutCardInputObjectSchema as ArcadeTopUpUpsertWithWhereUniqueWithoutCardInputObjectSchema } from './ArcadeTopUpUpsertWithWhereUniqueWithoutCardInput.schema';
import { ArcadeTopUpCreateManyCardInputEnvelopeObjectSchema as ArcadeTopUpCreateManyCardInputEnvelopeObjectSchema } from './ArcadeTopUpCreateManyCardInputEnvelope.schema';
import { ArcadeTopUpWhereUniqueInputObjectSchema as ArcadeTopUpWhereUniqueInputObjectSchema } from './ArcadeTopUpWhereUniqueInput.schema';
import { ArcadeTopUpUpdateWithWhereUniqueWithoutCardInputObjectSchema as ArcadeTopUpUpdateWithWhereUniqueWithoutCardInputObjectSchema } from './ArcadeTopUpUpdateWithWhereUniqueWithoutCardInput.schema';
import { ArcadeTopUpUpdateManyWithWhereWithoutCardInputObjectSchema as ArcadeTopUpUpdateManyWithWhereWithoutCardInputObjectSchema } from './ArcadeTopUpUpdateManyWithWhereWithoutCardInput.schema';
import { ArcadeTopUpScalarWhereInputObjectSchema as ArcadeTopUpScalarWhereInputObjectSchema } from './ArcadeTopUpScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ArcadeTopUpCreateWithoutCardInputObjectSchema), z.lazy(() => ArcadeTopUpCreateWithoutCardInputObjectSchema).array(), z.lazy(() => ArcadeTopUpUncheckedCreateWithoutCardInputObjectSchema), z.lazy(() => ArcadeTopUpUncheckedCreateWithoutCardInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ArcadeTopUpCreateOrConnectWithoutCardInputObjectSchema), z.lazy(() => ArcadeTopUpCreateOrConnectWithoutCardInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ArcadeTopUpUpsertWithWhereUniqueWithoutCardInputObjectSchema), z.lazy(() => ArcadeTopUpUpsertWithWhereUniqueWithoutCardInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ArcadeTopUpCreateManyCardInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ArcadeTopUpWhereUniqueInputObjectSchema), z.lazy(() => ArcadeTopUpWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ArcadeTopUpWhereUniqueInputObjectSchema), z.lazy(() => ArcadeTopUpWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ArcadeTopUpWhereUniqueInputObjectSchema), z.lazy(() => ArcadeTopUpWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ArcadeTopUpWhereUniqueInputObjectSchema), z.lazy(() => ArcadeTopUpWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ArcadeTopUpUpdateWithWhereUniqueWithoutCardInputObjectSchema), z.lazy(() => ArcadeTopUpUpdateWithWhereUniqueWithoutCardInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ArcadeTopUpUpdateManyWithWhereWithoutCardInputObjectSchema), z.lazy(() => ArcadeTopUpUpdateManyWithWhereWithoutCardInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ArcadeTopUpScalarWhereInputObjectSchema), z.lazy(() => ArcadeTopUpScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ArcadeTopUpUncheckedUpdateManyWithoutCardNestedInputObjectSchema: z.ZodType<Prisma.ArcadeTopUpUncheckedUpdateManyWithoutCardNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeTopUpUncheckedUpdateManyWithoutCardNestedInput>;
export const ArcadeTopUpUncheckedUpdateManyWithoutCardNestedInputObjectZodSchema = makeSchema();
