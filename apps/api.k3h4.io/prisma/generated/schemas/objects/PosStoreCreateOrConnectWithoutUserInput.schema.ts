import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosStoreWhereUniqueInputObjectSchema as PosStoreWhereUniqueInputObjectSchema } from './PosStoreWhereUniqueInput.schema';
import { PosStoreCreateWithoutUserInputObjectSchema as PosStoreCreateWithoutUserInputObjectSchema } from './PosStoreCreateWithoutUserInput.schema';
import { PosStoreUncheckedCreateWithoutUserInputObjectSchema as PosStoreUncheckedCreateWithoutUserInputObjectSchema } from './PosStoreUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PosStoreWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PosStoreCreateWithoutUserInputObjectSchema), z.lazy(() => PosStoreUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const PosStoreCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.PosStoreCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.PosStoreCreateOrConnectWithoutUserInput>;
export const PosStoreCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
