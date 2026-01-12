import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosStoreUpdateWithoutTicketsInputObjectSchema as PosStoreUpdateWithoutTicketsInputObjectSchema } from './PosStoreUpdateWithoutTicketsInput.schema';
import { PosStoreUncheckedUpdateWithoutTicketsInputObjectSchema as PosStoreUncheckedUpdateWithoutTicketsInputObjectSchema } from './PosStoreUncheckedUpdateWithoutTicketsInput.schema';
import { PosStoreCreateWithoutTicketsInputObjectSchema as PosStoreCreateWithoutTicketsInputObjectSchema } from './PosStoreCreateWithoutTicketsInput.schema';
import { PosStoreUncheckedCreateWithoutTicketsInputObjectSchema as PosStoreUncheckedCreateWithoutTicketsInputObjectSchema } from './PosStoreUncheckedCreateWithoutTicketsInput.schema';
import { PosStoreWhereInputObjectSchema as PosStoreWhereInputObjectSchema } from './PosStoreWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => PosStoreUpdateWithoutTicketsInputObjectSchema), z.lazy(() => PosStoreUncheckedUpdateWithoutTicketsInputObjectSchema)]),
  create: z.union([z.lazy(() => PosStoreCreateWithoutTicketsInputObjectSchema), z.lazy(() => PosStoreUncheckedCreateWithoutTicketsInputObjectSchema)]),
  where: z.lazy(() => PosStoreWhereInputObjectSchema).optional()
}).strict();
export const PosStoreUpsertWithoutTicketsInputObjectSchema: z.ZodType<Prisma.PosStoreUpsertWithoutTicketsInput> = makeSchema() as unknown as z.ZodType<Prisma.PosStoreUpsertWithoutTicketsInput>;
export const PosStoreUpsertWithoutTicketsInputObjectZodSchema = makeSchema();
