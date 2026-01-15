import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingPlacementCreateWithoutEngagementInputObjectSchema as StaffingPlacementCreateWithoutEngagementInputObjectSchema } from './StaffingPlacementCreateWithoutEngagementInput.schema';
import { StaffingPlacementUncheckedCreateWithoutEngagementInputObjectSchema as StaffingPlacementUncheckedCreateWithoutEngagementInputObjectSchema } from './StaffingPlacementUncheckedCreateWithoutEngagementInput.schema';
import { StaffingPlacementCreateOrConnectWithoutEngagementInputObjectSchema as StaffingPlacementCreateOrConnectWithoutEngagementInputObjectSchema } from './StaffingPlacementCreateOrConnectWithoutEngagementInput.schema';
import { StaffingPlacementUpsertWithWhereUniqueWithoutEngagementInputObjectSchema as StaffingPlacementUpsertWithWhereUniqueWithoutEngagementInputObjectSchema } from './StaffingPlacementUpsertWithWhereUniqueWithoutEngagementInput.schema';
import { StaffingPlacementCreateManyEngagementInputEnvelopeObjectSchema as StaffingPlacementCreateManyEngagementInputEnvelopeObjectSchema } from './StaffingPlacementCreateManyEngagementInputEnvelope.schema';
import { StaffingPlacementWhereUniqueInputObjectSchema as StaffingPlacementWhereUniqueInputObjectSchema } from './StaffingPlacementWhereUniqueInput.schema';
import { StaffingPlacementUpdateWithWhereUniqueWithoutEngagementInputObjectSchema as StaffingPlacementUpdateWithWhereUniqueWithoutEngagementInputObjectSchema } from './StaffingPlacementUpdateWithWhereUniqueWithoutEngagementInput.schema';
import { StaffingPlacementUpdateManyWithWhereWithoutEngagementInputObjectSchema as StaffingPlacementUpdateManyWithWhereWithoutEngagementInputObjectSchema } from './StaffingPlacementUpdateManyWithWhereWithoutEngagementInput.schema';
import { StaffingPlacementScalarWhereInputObjectSchema as StaffingPlacementScalarWhereInputObjectSchema } from './StaffingPlacementScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingPlacementCreateWithoutEngagementInputObjectSchema), z.lazy(() => StaffingPlacementCreateWithoutEngagementInputObjectSchema).array(), z.lazy(() => StaffingPlacementUncheckedCreateWithoutEngagementInputObjectSchema), z.lazy(() => StaffingPlacementUncheckedCreateWithoutEngagementInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StaffingPlacementCreateOrConnectWithoutEngagementInputObjectSchema), z.lazy(() => StaffingPlacementCreateOrConnectWithoutEngagementInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => StaffingPlacementUpsertWithWhereUniqueWithoutEngagementInputObjectSchema), z.lazy(() => StaffingPlacementUpsertWithWhereUniqueWithoutEngagementInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StaffingPlacementCreateManyEngagementInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema), z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema), z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema), z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema), z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => StaffingPlacementUpdateWithWhereUniqueWithoutEngagementInputObjectSchema), z.lazy(() => StaffingPlacementUpdateWithWhereUniqueWithoutEngagementInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => StaffingPlacementUpdateManyWithWhereWithoutEngagementInputObjectSchema), z.lazy(() => StaffingPlacementUpdateManyWithWhereWithoutEngagementInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => StaffingPlacementScalarWhereInputObjectSchema), z.lazy(() => StaffingPlacementScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const StaffingPlacementUpdateManyWithoutEngagementNestedInputObjectSchema: z.ZodType<Prisma.StaffingPlacementUpdateManyWithoutEngagementNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementUpdateManyWithoutEngagementNestedInput>;
export const StaffingPlacementUpdateManyWithoutEngagementNestedInputObjectZodSchema = makeSchema();
