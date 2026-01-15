import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingEngagementCreateWithoutUserInputObjectSchema as StaffingEngagementCreateWithoutUserInputObjectSchema } from './StaffingEngagementCreateWithoutUserInput.schema';
import { StaffingEngagementUncheckedCreateWithoutUserInputObjectSchema as StaffingEngagementUncheckedCreateWithoutUserInputObjectSchema } from './StaffingEngagementUncheckedCreateWithoutUserInput.schema';
import { StaffingEngagementCreateOrConnectWithoutUserInputObjectSchema as StaffingEngagementCreateOrConnectWithoutUserInputObjectSchema } from './StaffingEngagementCreateOrConnectWithoutUserInput.schema';
import { StaffingEngagementUpsertWithWhereUniqueWithoutUserInputObjectSchema as StaffingEngagementUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './StaffingEngagementUpsertWithWhereUniqueWithoutUserInput.schema';
import { StaffingEngagementCreateManyUserInputEnvelopeObjectSchema as StaffingEngagementCreateManyUserInputEnvelopeObjectSchema } from './StaffingEngagementCreateManyUserInputEnvelope.schema';
import { StaffingEngagementWhereUniqueInputObjectSchema as StaffingEngagementWhereUniqueInputObjectSchema } from './StaffingEngagementWhereUniqueInput.schema';
import { StaffingEngagementUpdateWithWhereUniqueWithoutUserInputObjectSchema as StaffingEngagementUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './StaffingEngagementUpdateWithWhereUniqueWithoutUserInput.schema';
import { StaffingEngagementUpdateManyWithWhereWithoutUserInputObjectSchema as StaffingEngagementUpdateManyWithWhereWithoutUserInputObjectSchema } from './StaffingEngagementUpdateManyWithWhereWithoutUserInput.schema';
import { StaffingEngagementScalarWhereInputObjectSchema as StaffingEngagementScalarWhereInputObjectSchema } from './StaffingEngagementScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingEngagementCreateWithoutUserInputObjectSchema), z.lazy(() => StaffingEngagementCreateWithoutUserInputObjectSchema).array(), z.lazy(() => StaffingEngagementUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => StaffingEngagementUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StaffingEngagementCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => StaffingEngagementCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => StaffingEngagementUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => StaffingEngagementUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StaffingEngagementCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => StaffingEngagementWhereUniqueInputObjectSchema), z.lazy(() => StaffingEngagementWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => StaffingEngagementWhereUniqueInputObjectSchema), z.lazy(() => StaffingEngagementWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => StaffingEngagementWhereUniqueInputObjectSchema), z.lazy(() => StaffingEngagementWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => StaffingEngagementWhereUniqueInputObjectSchema), z.lazy(() => StaffingEngagementWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => StaffingEngagementUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => StaffingEngagementUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => StaffingEngagementUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => StaffingEngagementUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => StaffingEngagementScalarWhereInputObjectSchema), z.lazy(() => StaffingEngagementScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const StaffingEngagementUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.StaffingEngagementUncheckedUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingEngagementUncheckedUpdateManyWithoutUserNestedInput>;
export const StaffingEngagementUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
