import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosTicketCreateWithoutStoreInputObjectSchema as PosTicketCreateWithoutStoreInputObjectSchema } from './PosTicketCreateWithoutStoreInput.schema';
import { PosTicketUncheckedCreateWithoutStoreInputObjectSchema as PosTicketUncheckedCreateWithoutStoreInputObjectSchema } from './PosTicketUncheckedCreateWithoutStoreInput.schema';
import { PosTicketCreateOrConnectWithoutStoreInputObjectSchema as PosTicketCreateOrConnectWithoutStoreInputObjectSchema } from './PosTicketCreateOrConnectWithoutStoreInput.schema';
import { PosTicketCreateManyStoreInputEnvelopeObjectSchema as PosTicketCreateManyStoreInputEnvelopeObjectSchema } from './PosTicketCreateManyStoreInputEnvelope.schema';
import { PosTicketWhereUniqueInputObjectSchema as PosTicketWhereUniqueInputObjectSchema } from './PosTicketWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PosTicketCreateWithoutStoreInputObjectSchema), z.lazy(() => PosTicketCreateWithoutStoreInputObjectSchema).array(), z.lazy(() => PosTicketUncheckedCreateWithoutStoreInputObjectSchema), z.lazy(() => PosTicketUncheckedCreateWithoutStoreInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PosTicketCreateOrConnectWithoutStoreInputObjectSchema), z.lazy(() => PosTicketCreateOrConnectWithoutStoreInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PosTicketCreateManyStoreInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => PosTicketWhereUniqueInputObjectSchema), z.lazy(() => PosTicketWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const PosTicketUncheckedCreateNestedManyWithoutStoreInputObjectSchema: z.ZodType<Prisma.PosTicketUncheckedCreateNestedManyWithoutStoreInput> = makeSchema() as unknown as z.ZodType<Prisma.PosTicketUncheckedCreateNestedManyWithoutStoreInput>;
export const PosTicketUncheckedCreateNestedManyWithoutStoreInputObjectZodSchema = makeSchema();
