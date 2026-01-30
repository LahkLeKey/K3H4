import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FreightLoadCreateWithoutUserInputObjectSchema as FreightLoadCreateWithoutUserInputObjectSchema } from './FreightLoadCreateWithoutUserInput.schema';
import { FreightLoadUncheckedCreateWithoutUserInputObjectSchema as FreightLoadUncheckedCreateWithoutUserInputObjectSchema } from './FreightLoadUncheckedCreateWithoutUserInput.schema';
import { FreightLoadCreateOrConnectWithoutUserInputObjectSchema as FreightLoadCreateOrConnectWithoutUserInputObjectSchema } from './FreightLoadCreateOrConnectWithoutUserInput.schema';
import { FreightLoadCreateManyUserInputEnvelopeObjectSchema as FreightLoadCreateManyUserInputEnvelopeObjectSchema } from './FreightLoadCreateManyUserInputEnvelope.schema';
import { FreightLoadWhereUniqueInputObjectSchema as FreightLoadWhereUniqueInputObjectSchema } from './FreightLoadWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => FreightLoadCreateWithoutUserInputObjectSchema), z.lazy(() => FreightLoadCreateWithoutUserInputObjectSchema).array(), z.lazy(() => FreightLoadUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => FreightLoadUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => FreightLoadCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => FreightLoadCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => FreightLoadCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => FreightLoadWhereUniqueInputObjectSchema), z.lazy(() => FreightLoadWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const FreightLoadCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.FreightLoadCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.FreightLoadCreateNestedManyWithoutUserInput>;
export const FreightLoadCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
