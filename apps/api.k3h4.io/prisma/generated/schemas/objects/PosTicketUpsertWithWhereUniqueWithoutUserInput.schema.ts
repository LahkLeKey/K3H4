import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosTicketWhereUniqueInputObjectSchema as PosTicketWhereUniqueInputObjectSchema } from './PosTicketWhereUniqueInput.schema';
import { PosTicketUpdateWithoutUserInputObjectSchema as PosTicketUpdateWithoutUserInputObjectSchema } from './PosTicketUpdateWithoutUserInput.schema';
import { PosTicketUncheckedUpdateWithoutUserInputObjectSchema as PosTicketUncheckedUpdateWithoutUserInputObjectSchema } from './PosTicketUncheckedUpdateWithoutUserInput.schema';
import { PosTicketCreateWithoutUserInputObjectSchema as PosTicketCreateWithoutUserInputObjectSchema } from './PosTicketCreateWithoutUserInput.schema';
import { PosTicketUncheckedCreateWithoutUserInputObjectSchema as PosTicketUncheckedCreateWithoutUserInputObjectSchema } from './PosTicketUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PosTicketWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => PosTicketUpdateWithoutUserInputObjectSchema), z.lazy(() => PosTicketUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => PosTicketCreateWithoutUserInputObjectSchema), z.lazy(() => PosTicketUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const PosTicketUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.PosTicketUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.PosTicketUpsertWithWhereUniqueWithoutUserInput>;
export const PosTicketUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
