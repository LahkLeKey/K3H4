import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosStoreWhereInputObjectSchema as PosStoreWhereInputObjectSchema } from './PosStoreWhereInput.schema';
import { PosStoreUpdateWithoutTicketsInputObjectSchema as PosStoreUpdateWithoutTicketsInputObjectSchema } from './PosStoreUpdateWithoutTicketsInput.schema';
import { PosStoreUncheckedUpdateWithoutTicketsInputObjectSchema as PosStoreUncheckedUpdateWithoutTicketsInputObjectSchema } from './PosStoreUncheckedUpdateWithoutTicketsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PosStoreWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => PosStoreUpdateWithoutTicketsInputObjectSchema), z.lazy(() => PosStoreUncheckedUpdateWithoutTicketsInputObjectSchema)])
}).strict();
export const PosStoreUpdateToOneWithWhereWithoutTicketsInputObjectSchema: z.ZodType<Prisma.PosStoreUpdateToOneWithWhereWithoutTicketsInput> = makeSchema() as unknown as z.ZodType<Prisma.PosStoreUpdateToOneWithWhereWithoutTicketsInput>;
export const PosStoreUpdateToOneWithWhereWithoutTicketsInputObjectZodSchema = makeSchema();
