import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosTicketCreateWithoutStoreInputObjectSchema as PosTicketCreateWithoutStoreInputObjectSchema } from './PosTicketCreateWithoutStoreInput.schema';
import { PosTicketUncheckedCreateWithoutStoreInputObjectSchema as PosTicketUncheckedCreateWithoutStoreInputObjectSchema } from './PosTicketUncheckedCreateWithoutStoreInput.schema';
import { PosTicketCreateOrConnectWithoutStoreInputObjectSchema as PosTicketCreateOrConnectWithoutStoreInputObjectSchema } from './PosTicketCreateOrConnectWithoutStoreInput.schema';
import { PosTicketUpsertWithWhereUniqueWithoutStoreInputObjectSchema as PosTicketUpsertWithWhereUniqueWithoutStoreInputObjectSchema } from './PosTicketUpsertWithWhereUniqueWithoutStoreInput.schema';
import { PosTicketCreateManyStoreInputEnvelopeObjectSchema as PosTicketCreateManyStoreInputEnvelopeObjectSchema } from './PosTicketCreateManyStoreInputEnvelope.schema';
import { PosTicketWhereUniqueInputObjectSchema as PosTicketWhereUniqueInputObjectSchema } from './PosTicketWhereUniqueInput.schema';
import { PosTicketUpdateWithWhereUniqueWithoutStoreInputObjectSchema as PosTicketUpdateWithWhereUniqueWithoutStoreInputObjectSchema } from './PosTicketUpdateWithWhereUniqueWithoutStoreInput.schema';
import { PosTicketUpdateManyWithWhereWithoutStoreInputObjectSchema as PosTicketUpdateManyWithWhereWithoutStoreInputObjectSchema } from './PosTicketUpdateManyWithWhereWithoutStoreInput.schema';
import { PosTicketScalarWhereInputObjectSchema as PosTicketScalarWhereInputObjectSchema } from './PosTicketScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PosTicketCreateWithoutStoreInputObjectSchema), z.lazy(() => PosTicketCreateWithoutStoreInputObjectSchema).array(), z.lazy(() => PosTicketUncheckedCreateWithoutStoreInputObjectSchema), z.lazy(() => PosTicketUncheckedCreateWithoutStoreInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PosTicketCreateOrConnectWithoutStoreInputObjectSchema), z.lazy(() => PosTicketCreateOrConnectWithoutStoreInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => PosTicketUpsertWithWhereUniqueWithoutStoreInputObjectSchema), z.lazy(() => PosTicketUpsertWithWhereUniqueWithoutStoreInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PosTicketCreateManyStoreInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => PosTicketWhereUniqueInputObjectSchema), z.lazy(() => PosTicketWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => PosTicketWhereUniqueInputObjectSchema), z.lazy(() => PosTicketWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => PosTicketWhereUniqueInputObjectSchema), z.lazy(() => PosTicketWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => PosTicketWhereUniqueInputObjectSchema), z.lazy(() => PosTicketWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => PosTicketUpdateWithWhereUniqueWithoutStoreInputObjectSchema), z.lazy(() => PosTicketUpdateWithWhereUniqueWithoutStoreInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => PosTicketUpdateManyWithWhereWithoutStoreInputObjectSchema), z.lazy(() => PosTicketUpdateManyWithWhereWithoutStoreInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => PosTicketScalarWhereInputObjectSchema), z.lazy(() => PosTicketScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const PosTicketUncheckedUpdateManyWithoutStoreNestedInputObjectSchema: z.ZodType<Prisma.PosTicketUncheckedUpdateManyWithoutStoreNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PosTicketUncheckedUpdateManyWithoutStoreNestedInput>;
export const PosTicketUncheckedUpdateManyWithoutStoreNestedInputObjectZodSchema = makeSchema();
