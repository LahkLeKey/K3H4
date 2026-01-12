import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FreightLoadCreateWithoutUserInputObjectSchema as FreightLoadCreateWithoutUserInputObjectSchema } from './FreightLoadCreateWithoutUserInput.schema';
import { FreightLoadUncheckedCreateWithoutUserInputObjectSchema as FreightLoadUncheckedCreateWithoutUserInputObjectSchema } from './FreightLoadUncheckedCreateWithoutUserInput.schema';
import { FreightLoadCreateOrConnectWithoutUserInputObjectSchema as FreightLoadCreateOrConnectWithoutUserInputObjectSchema } from './FreightLoadCreateOrConnectWithoutUserInput.schema';
import { FreightLoadUpsertWithWhereUniqueWithoutUserInputObjectSchema as FreightLoadUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './FreightLoadUpsertWithWhereUniqueWithoutUserInput.schema';
import { FreightLoadCreateManyUserInputEnvelopeObjectSchema as FreightLoadCreateManyUserInputEnvelopeObjectSchema } from './FreightLoadCreateManyUserInputEnvelope.schema';
import { FreightLoadWhereUniqueInputObjectSchema as FreightLoadWhereUniqueInputObjectSchema } from './FreightLoadWhereUniqueInput.schema';
import { FreightLoadUpdateWithWhereUniqueWithoutUserInputObjectSchema as FreightLoadUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './FreightLoadUpdateWithWhereUniqueWithoutUserInput.schema';
import { FreightLoadUpdateManyWithWhereWithoutUserInputObjectSchema as FreightLoadUpdateManyWithWhereWithoutUserInputObjectSchema } from './FreightLoadUpdateManyWithWhereWithoutUserInput.schema';
import { FreightLoadScalarWhereInputObjectSchema as FreightLoadScalarWhereInputObjectSchema } from './FreightLoadScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => FreightLoadCreateWithoutUserInputObjectSchema), z.lazy(() => FreightLoadCreateWithoutUserInputObjectSchema).array(), z.lazy(() => FreightLoadUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => FreightLoadUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => FreightLoadCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => FreightLoadCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => FreightLoadUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => FreightLoadUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => FreightLoadCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => FreightLoadWhereUniqueInputObjectSchema), z.lazy(() => FreightLoadWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => FreightLoadWhereUniqueInputObjectSchema), z.lazy(() => FreightLoadWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => FreightLoadWhereUniqueInputObjectSchema), z.lazy(() => FreightLoadWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => FreightLoadWhereUniqueInputObjectSchema), z.lazy(() => FreightLoadWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => FreightLoadUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => FreightLoadUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => FreightLoadUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => FreightLoadUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => FreightLoadScalarWhereInputObjectSchema), z.lazy(() => FreightLoadScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const FreightLoadUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.FreightLoadUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.FreightLoadUpdateManyWithoutUserNestedInput>;
export const FreightLoadUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
