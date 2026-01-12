import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosTicketScalarWhereInputObjectSchema as PosTicketScalarWhereInputObjectSchema } from './PosTicketScalarWhereInput.schema';
import { PosTicketUpdateManyMutationInputObjectSchema as PosTicketUpdateManyMutationInputObjectSchema } from './PosTicketUpdateManyMutationInput.schema';
import { PosTicketUncheckedUpdateManyWithoutStoreInputObjectSchema as PosTicketUncheckedUpdateManyWithoutStoreInputObjectSchema } from './PosTicketUncheckedUpdateManyWithoutStoreInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PosTicketScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => PosTicketUpdateManyMutationInputObjectSchema), z.lazy(() => PosTicketUncheckedUpdateManyWithoutStoreInputObjectSchema)])
}).strict();
export const PosTicketUpdateManyWithWhereWithoutStoreInputObjectSchema: z.ZodType<Prisma.PosTicketUpdateManyWithWhereWithoutStoreInput> = makeSchema() as unknown as z.ZodType<Prisma.PosTicketUpdateManyWithWhereWithoutStoreInput>;
export const PosTicketUpdateManyWithWhereWithoutStoreInputObjectZodSchema = makeSchema();
