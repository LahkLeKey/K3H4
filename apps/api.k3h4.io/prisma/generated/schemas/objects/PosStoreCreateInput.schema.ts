import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutPosStoresInputObjectSchema as UserCreateNestedOneWithoutPosStoresInputObjectSchema } from './UserCreateNestedOneWithoutPosStoresInput.schema';
import { PosTicketCreateNestedManyWithoutStoreInputObjectSchema as PosTicketCreateNestedManyWithoutStoreInputObjectSchema } from './PosTicketCreateNestedManyWithoutStoreInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  channel: z.string(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutPosStoresInputObjectSchema),
  tickets: z.lazy(() => PosTicketCreateNestedManyWithoutStoreInputObjectSchema).optional()
}).strict();
export const PosStoreCreateInputObjectSchema: z.ZodType<Prisma.PosStoreCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.PosStoreCreateInput>;
export const PosStoreCreateInputObjectZodSchema = makeSchema();
