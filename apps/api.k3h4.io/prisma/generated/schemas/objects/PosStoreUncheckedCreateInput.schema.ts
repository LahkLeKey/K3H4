import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosTicketUncheckedCreateNestedManyWithoutStoreInputObjectSchema as PosTicketUncheckedCreateNestedManyWithoutStoreInputObjectSchema } from './PosTicketUncheckedCreateNestedManyWithoutStoreInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  name: z.string(),
  channel: z.string(),
  createdAt: z.coerce.date().optional(),
  tickets: z.lazy(() => PosTicketUncheckedCreateNestedManyWithoutStoreInputObjectSchema).optional()
}).strict();
export const PosStoreUncheckedCreateInputObjectSchema: z.ZodType<Prisma.PosStoreUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.PosStoreUncheckedCreateInput>;
export const PosStoreUncheckedCreateInputObjectZodSchema = makeSchema();
