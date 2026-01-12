import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosStoreCreateWithoutUserInputObjectSchema as PosStoreCreateWithoutUserInputObjectSchema } from './PosStoreCreateWithoutUserInput.schema';
import { PosStoreUncheckedCreateWithoutUserInputObjectSchema as PosStoreUncheckedCreateWithoutUserInputObjectSchema } from './PosStoreUncheckedCreateWithoutUserInput.schema';
import { PosStoreCreateOrConnectWithoutUserInputObjectSchema as PosStoreCreateOrConnectWithoutUserInputObjectSchema } from './PosStoreCreateOrConnectWithoutUserInput.schema';
import { PosStoreCreateManyUserInputEnvelopeObjectSchema as PosStoreCreateManyUserInputEnvelopeObjectSchema } from './PosStoreCreateManyUserInputEnvelope.schema';
import { PosStoreWhereUniqueInputObjectSchema as PosStoreWhereUniqueInputObjectSchema } from './PosStoreWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PosStoreCreateWithoutUserInputObjectSchema), z.lazy(() => PosStoreCreateWithoutUserInputObjectSchema).array(), z.lazy(() => PosStoreUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => PosStoreUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PosStoreCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => PosStoreCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PosStoreCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => PosStoreWhereUniqueInputObjectSchema), z.lazy(() => PosStoreWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const PosStoreUncheckedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.PosStoreUncheckedCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.PosStoreUncheckedCreateNestedManyWithoutUserInput>;
export const PosStoreUncheckedCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
