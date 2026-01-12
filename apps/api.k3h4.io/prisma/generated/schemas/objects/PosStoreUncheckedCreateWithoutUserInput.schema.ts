import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosTicketUncheckedCreateNestedManyWithoutStoreInputObjectSchema as PosTicketUncheckedCreateNestedManyWithoutStoreInputObjectSchema } from './PosTicketUncheckedCreateNestedManyWithoutStoreInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  channel: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tickets: z.lazy(() => PosTicketUncheckedCreateNestedManyWithoutStoreInputObjectSchema).optional()
}).strict();
export const PosStoreUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.PosStoreUncheckedCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.PosStoreUncheckedCreateWithoutUserInput>;
export const PosStoreUncheckedCreateWithoutUserInputObjectZodSchema = makeSchema();
