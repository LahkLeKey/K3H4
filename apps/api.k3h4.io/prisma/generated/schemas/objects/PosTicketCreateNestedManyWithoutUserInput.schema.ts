import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosTicketCreateWithoutUserInputObjectSchema as PosTicketCreateWithoutUserInputObjectSchema } from './PosTicketCreateWithoutUserInput.schema';
import { PosTicketUncheckedCreateWithoutUserInputObjectSchema as PosTicketUncheckedCreateWithoutUserInputObjectSchema } from './PosTicketUncheckedCreateWithoutUserInput.schema';
import { PosTicketCreateOrConnectWithoutUserInputObjectSchema as PosTicketCreateOrConnectWithoutUserInputObjectSchema } from './PosTicketCreateOrConnectWithoutUserInput.schema';
import { PosTicketCreateManyUserInputEnvelopeObjectSchema as PosTicketCreateManyUserInputEnvelopeObjectSchema } from './PosTicketCreateManyUserInputEnvelope.schema';
import { PosTicketWhereUniqueInputObjectSchema as PosTicketWhereUniqueInputObjectSchema } from './PosTicketWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PosTicketCreateWithoutUserInputObjectSchema), z.lazy(() => PosTicketCreateWithoutUserInputObjectSchema).array(), z.lazy(() => PosTicketUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => PosTicketUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PosTicketCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => PosTicketCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PosTicketCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => PosTicketWhereUniqueInputObjectSchema), z.lazy(() => PosTicketWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const PosTicketCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.PosTicketCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.PosTicketCreateNestedManyWithoutUserInput>;
export const PosTicketCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
