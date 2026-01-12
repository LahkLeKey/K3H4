import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosStoreCreateWithoutTicketsInputObjectSchema as PosStoreCreateWithoutTicketsInputObjectSchema } from './PosStoreCreateWithoutTicketsInput.schema';
import { PosStoreUncheckedCreateWithoutTicketsInputObjectSchema as PosStoreUncheckedCreateWithoutTicketsInputObjectSchema } from './PosStoreUncheckedCreateWithoutTicketsInput.schema';
import { PosStoreCreateOrConnectWithoutTicketsInputObjectSchema as PosStoreCreateOrConnectWithoutTicketsInputObjectSchema } from './PosStoreCreateOrConnectWithoutTicketsInput.schema';
import { PosStoreWhereUniqueInputObjectSchema as PosStoreWhereUniqueInputObjectSchema } from './PosStoreWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PosStoreCreateWithoutTicketsInputObjectSchema), z.lazy(() => PosStoreUncheckedCreateWithoutTicketsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => PosStoreCreateOrConnectWithoutTicketsInputObjectSchema).optional(),
  connect: z.lazy(() => PosStoreWhereUniqueInputObjectSchema).optional()
}).strict();
export const PosStoreCreateNestedOneWithoutTicketsInputObjectSchema: z.ZodType<Prisma.PosStoreCreateNestedOneWithoutTicketsInput> = makeSchema() as unknown as z.ZodType<Prisma.PosStoreCreateNestedOneWithoutTicketsInput>;
export const PosStoreCreateNestedOneWithoutTicketsInputObjectZodSchema = makeSchema();
