import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosTicketScalarWhereInputObjectSchema as PosTicketScalarWhereInputObjectSchema } from './PosTicketScalarWhereInput.schema';
import { PosTicketUpdateManyMutationInputObjectSchema as PosTicketUpdateManyMutationInputObjectSchema } from './PosTicketUpdateManyMutationInput.schema';
import { PosTicketUncheckedUpdateManyWithoutUserInputObjectSchema as PosTicketUncheckedUpdateManyWithoutUserInputObjectSchema } from './PosTicketUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PosTicketScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => PosTicketUpdateManyMutationInputObjectSchema), z.lazy(() => PosTicketUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const PosTicketUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.PosTicketUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.PosTicketUpdateManyWithWhereWithoutUserInput>;
export const PosTicketUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
