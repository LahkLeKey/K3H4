import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutPosStoresInputObjectSchema as UserCreateNestedOneWithoutPosStoresInputObjectSchema } from './UserCreateNestedOneWithoutPosStoresInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  channel: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutPosStoresInputObjectSchema)
}).strict();
export const PosStoreCreateWithoutTicketsInputObjectSchema: z.ZodType<Prisma.PosStoreCreateWithoutTicketsInput> = makeSchema() as unknown as z.ZodType<Prisma.PosStoreCreateWithoutTicketsInput>;
export const PosStoreCreateWithoutTicketsInputObjectZodSchema = makeSchema();
