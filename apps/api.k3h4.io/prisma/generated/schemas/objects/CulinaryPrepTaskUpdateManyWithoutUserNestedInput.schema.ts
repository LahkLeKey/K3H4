import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CulinaryPrepTaskCreateWithoutUserInputObjectSchema as CulinaryPrepTaskCreateWithoutUserInputObjectSchema } from './CulinaryPrepTaskCreateWithoutUserInput.schema';
import { CulinaryPrepTaskUncheckedCreateWithoutUserInputObjectSchema as CulinaryPrepTaskUncheckedCreateWithoutUserInputObjectSchema } from './CulinaryPrepTaskUncheckedCreateWithoutUserInput.schema';
import { CulinaryPrepTaskCreateOrConnectWithoutUserInputObjectSchema as CulinaryPrepTaskCreateOrConnectWithoutUserInputObjectSchema } from './CulinaryPrepTaskCreateOrConnectWithoutUserInput.schema';
import { CulinaryPrepTaskUpsertWithWhereUniqueWithoutUserInputObjectSchema as CulinaryPrepTaskUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './CulinaryPrepTaskUpsertWithWhereUniqueWithoutUserInput.schema';
import { CulinaryPrepTaskCreateManyUserInputEnvelopeObjectSchema as CulinaryPrepTaskCreateManyUserInputEnvelopeObjectSchema } from './CulinaryPrepTaskCreateManyUserInputEnvelope.schema';
import { CulinaryPrepTaskWhereUniqueInputObjectSchema as CulinaryPrepTaskWhereUniqueInputObjectSchema } from './CulinaryPrepTaskWhereUniqueInput.schema';
import { CulinaryPrepTaskUpdateWithWhereUniqueWithoutUserInputObjectSchema as CulinaryPrepTaskUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './CulinaryPrepTaskUpdateWithWhereUniqueWithoutUserInput.schema';
import { CulinaryPrepTaskUpdateManyWithWhereWithoutUserInputObjectSchema as CulinaryPrepTaskUpdateManyWithWhereWithoutUserInputObjectSchema } from './CulinaryPrepTaskUpdateManyWithWhereWithoutUserInput.schema';
import { CulinaryPrepTaskScalarWhereInputObjectSchema as CulinaryPrepTaskScalarWhereInputObjectSchema } from './CulinaryPrepTaskScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CulinaryPrepTaskCreateWithoutUserInputObjectSchema), z.lazy(() => CulinaryPrepTaskCreateWithoutUserInputObjectSchema).array(), z.lazy(() => CulinaryPrepTaskUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => CulinaryPrepTaskUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CulinaryPrepTaskCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => CulinaryPrepTaskCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CulinaryPrepTaskUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => CulinaryPrepTaskUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CulinaryPrepTaskCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CulinaryPrepTaskWhereUniqueInputObjectSchema), z.lazy(() => CulinaryPrepTaskWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CulinaryPrepTaskWhereUniqueInputObjectSchema), z.lazy(() => CulinaryPrepTaskWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CulinaryPrepTaskWhereUniqueInputObjectSchema), z.lazy(() => CulinaryPrepTaskWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CulinaryPrepTaskWhereUniqueInputObjectSchema), z.lazy(() => CulinaryPrepTaskWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CulinaryPrepTaskUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => CulinaryPrepTaskUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CulinaryPrepTaskUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => CulinaryPrepTaskUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CulinaryPrepTaskScalarWhereInputObjectSchema), z.lazy(() => CulinaryPrepTaskScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CulinaryPrepTaskUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.CulinaryPrepTaskUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryPrepTaskUpdateManyWithoutUserNestedInput>;
export const CulinaryPrepTaskUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
