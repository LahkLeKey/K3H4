import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosTicketCreateNestedManyWithoutStoreInputObjectSchema as PosTicketCreateNestedManyWithoutStoreInputObjectSchema } from './PosTicketCreateNestedManyWithoutStoreInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  channel: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tickets: z.lazy(() => PosTicketCreateNestedManyWithoutStoreInputObjectSchema).optional()
}).strict();
export const PosStoreCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.PosStoreCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.PosStoreCreateWithoutUserInput>;
export const PosStoreCreateWithoutUserInputObjectZodSchema = makeSchema();
