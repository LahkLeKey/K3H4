import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosStoreCreateWithoutTicketsInputObjectSchema as PosStoreCreateWithoutTicketsInputObjectSchema } from './PosStoreCreateWithoutTicketsInput.schema';
import { PosStoreUncheckedCreateWithoutTicketsInputObjectSchema as PosStoreUncheckedCreateWithoutTicketsInputObjectSchema } from './PosStoreUncheckedCreateWithoutTicketsInput.schema';
import { PosStoreCreateOrConnectWithoutTicketsInputObjectSchema as PosStoreCreateOrConnectWithoutTicketsInputObjectSchema } from './PosStoreCreateOrConnectWithoutTicketsInput.schema';
import { PosStoreUpsertWithoutTicketsInputObjectSchema as PosStoreUpsertWithoutTicketsInputObjectSchema } from './PosStoreUpsertWithoutTicketsInput.schema';
import { PosStoreWhereUniqueInputObjectSchema as PosStoreWhereUniqueInputObjectSchema } from './PosStoreWhereUniqueInput.schema';
import { PosStoreUpdateToOneWithWhereWithoutTicketsInputObjectSchema as PosStoreUpdateToOneWithWhereWithoutTicketsInputObjectSchema } from './PosStoreUpdateToOneWithWhereWithoutTicketsInput.schema';
import { PosStoreUpdateWithoutTicketsInputObjectSchema as PosStoreUpdateWithoutTicketsInputObjectSchema } from './PosStoreUpdateWithoutTicketsInput.schema';
import { PosStoreUncheckedUpdateWithoutTicketsInputObjectSchema as PosStoreUncheckedUpdateWithoutTicketsInputObjectSchema } from './PosStoreUncheckedUpdateWithoutTicketsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PosStoreCreateWithoutTicketsInputObjectSchema), z.lazy(() => PosStoreUncheckedCreateWithoutTicketsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => PosStoreCreateOrConnectWithoutTicketsInputObjectSchema).optional(),
  upsert: z.lazy(() => PosStoreUpsertWithoutTicketsInputObjectSchema).optional(),
  connect: z.lazy(() => PosStoreWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => PosStoreUpdateToOneWithWhereWithoutTicketsInputObjectSchema), z.lazy(() => PosStoreUpdateWithoutTicketsInputObjectSchema), z.lazy(() => PosStoreUncheckedUpdateWithoutTicketsInputObjectSchema)]).optional()
}).strict();
export const PosStoreUpdateOneRequiredWithoutTicketsNestedInputObjectSchema: z.ZodType<Prisma.PosStoreUpdateOneRequiredWithoutTicketsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PosStoreUpdateOneRequiredWithoutTicketsNestedInput>;
export const PosStoreUpdateOneRequiredWithoutTicketsNestedInputObjectZodSchema = makeSchema();
