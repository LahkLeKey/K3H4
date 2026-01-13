import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosTicketCreateWithoutUserInputObjectSchema as PosTicketCreateWithoutUserInputObjectSchema } from './PosTicketCreateWithoutUserInput.schema';
import { PosTicketUncheckedCreateWithoutUserInputObjectSchema as PosTicketUncheckedCreateWithoutUserInputObjectSchema } from './PosTicketUncheckedCreateWithoutUserInput.schema';
import { PosTicketCreateOrConnectWithoutUserInputObjectSchema as PosTicketCreateOrConnectWithoutUserInputObjectSchema } from './PosTicketCreateOrConnectWithoutUserInput.schema';
import { PosTicketUpsertWithWhereUniqueWithoutUserInputObjectSchema as PosTicketUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './PosTicketUpsertWithWhereUniqueWithoutUserInput.schema';
import { PosTicketCreateManyUserInputEnvelopeObjectSchema as PosTicketCreateManyUserInputEnvelopeObjectSchema } from './PosTicketCreateManyUserInputEnvelope.schema';
import { PosTicketWhereUniqueInputObjectSchema as PosTicketWhereUniqueInputObjectSchema } from './PosTicketWhereUniqueInput.schema';
import { PosTicketUpdateWithWhereUniqueWithoutUserInputObjectSchema as PosTicketUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './PosTicketUpdateWithWhereUniqueWithoutUserInput.schema';
import { PosTicketUpdateManyWithWhereWithoutUserInputObjectSchema as PosTicketUpdateManyWithWhereWithoutUserInputObjectSchema } from './PosTicketUpdateManyWithWhereWithoutUserInput.schema';
import { PosTicketScalarWhereInputObjectSchema as PosTicketScalarWhereInputObjectSchema } from './PosTicketScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PosTicketCreateWithoutUserInputObjectSchema), z.lazy(() => PosTicketCreateWithoutUserInputObjectSchema).array(), z.lazy(() => PosTicketUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => PosTicketUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PosTicketCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => PosTicketCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => PosTicketUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => PosTicketUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PosTicketCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => PosTicketWhereUniqueInputObjectSchema), z.lazy(() => PosTicketWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => PosTicketWhereUniqueInputObjectSchema), z.lazy(() => PosTicketWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => PosTicketWhereUniqueInputObjectSchema), z.lazy(() => PosTicketWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => PosTicketWhereUniqueInputObjectSchema), z.lazy(() => PosTicketWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => PosTicketUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => PosTicketUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => PosTicketUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => PosTicketUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => PosTicketScalarWhereInputObjectSchema), z.lazy(() => PosTicketScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const PosTicketUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.PosTicketUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PosTicketUpdateManyWithoutUserNestedInput>;
export const PosTicketUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
