import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosStoreWhereUniqueInputObjectSchema as PosStoreWhereUniqueInputObjectSchema } from './PosStoreWhereUniqueInput.schema';
import { PosStoreCreateWithoutTicketsInputObjectSchema as PosStoreCreateWithoutTicketsInputObjectSchema } from './PosStoreCreateWithoutTicketsInput.schema';
import { PosStoreUncheckedCreateWithoutTicketsInputObjectSchema as PosStoreUncheckedCreateWithoutTicketsInputObjectSchema } from './PosStoreUncheckedCreateWithoutTicketsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PosStoreWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PosStoreCreateWithoutTicketsInputObjectSchema), z.lazy(() => PosStoreUncheckedCreateWithoutTicketsInputObjectSchema)])
}).strict();
export const PosStoreCreateOrConnectWithoutTicketsInputObjectSchema: z.ZodType<Prisma.PosStoreCreateOrConnectWithoutTicketsInput> = makeSchema() as unknown as z.ZodType<Prisma.PosStoreCreateOrConnectWithoutTicketsInput>;
export const PosStoreCreateOrConnectWithoutTicketsInputObjectZodSchema = makeSchema();
