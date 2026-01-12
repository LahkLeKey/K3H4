import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosTicketWhereUniqueInputObjectSchema as PosTicketWhereUniqueInputObjectSchema } from './PosTicketWhereUniqueInput.schema';
import { PosTicketUpdateWithoutUserInputObjectSchema as PosTicketUpdateWithoutUserInputObjectSchema } from './PosTicketUpdateWithoutUserInput.schema';
import { PosTicketUncheckedUpdateWithoutUserInputObjectSchema as PosTicketUncheckedUpdateWithoutUserInputObjectSchema } from './PosTicketUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PosTicketWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => PosTicketUpdateWithoutUserInputObjectSchema), z.lazy(() => PosTicketUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const PosTicketUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.PosTicketUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.PosTicketUpdateWithWhereUniqueWithoutUserInput>;
export const PosTicketUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
