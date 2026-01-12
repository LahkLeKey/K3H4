import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosTicketWhereUniqueInputObjectSchema as PosTicketWhereUniqueInputObjectSchema } from './PosTicketWhereUniqueInput.schema';
import { PosTicketCreateWithoutUserInputObjectSchema as PosTicketCreateWithoutUserInputObjectSchema } from './PosTicketCreateWithoutUserInput.schema';
import { PosTicketUncheckedCreateWithoutUserInputObjectSchema as PosTicketUncheckedCreateWithoutUserInputObjectSchema } from './PosTicketUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PosTicketWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PosTicketCreateWithoutUserInputObjectSchema), z.lazy(() => PosTicketUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const PosTicketCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.PosTicketCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.PosTicketCreateOrConnectWithoutUserInput>;
export const PosTicketCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
