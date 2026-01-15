import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingPlacementCreateWithoutEngagementInputObjectSchema as StaffingPlacementCreateWithoutEngagementInputObjectSchema } from './StaffingPlacementCreateWithoutEngagementInput.schema';
import { StaffingPlacementUncheckedCreateWithoutEngagementInputObjectSchema as StaffingPlacementUncheckedCreateWithoutEngagementInputObjectSchema } from './StaffingPlacementUncheckedCreateWithoutEngagementInput.schema';
import { StaffingPlacementCreateOrConnectWithoutEngagementInputObjectSchema as StaffingPlacementCreateOrConnectWithoutEngagementInputObjectSchema } from './StaffingPlacementCreateOrConnectWithoutEngagementInput.schema';
import { StaffingPlacementCreateManyEngagementInputEnvelopeObjectSchema as StaffingPlacementCreateManyEngagementInputEnvelopeObjectSchema } from './StaffingPlacementCreateManyEngagementInputEnvelope.schema';
import { StaffingPlacementWhereUniqueInputObjectSchema as StaffingPlacementWhereUniqueInputObjectSchema } from './StaffingPlacementWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingPlacementCreateWithoutEngagementInputObjectSchema), z.lazy(() => StaffingPlacementCreateWithoutEngagementInputObjectSchema).array(), z.lazy(() => StaffingPlacementUncheckedCreateWithoutEngagementInputObjectSchema), z.lazy(() => StaffingPlacementUncheckedCreateWithoutEngagementInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StaffingPlacementCreateOrConnectWithoutEngagementInputObjectSchema), z.lazy(() => StaffingPlacementCreateOrConnectWithoutEngagementInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StaffingPlacementCreateManyEngagementInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema), z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const StaffingPlacementCreateNestedManyWithoutEngagementInputObjectSchema: z.ZodType<Prisma.StaffingPlacementCreateNestedManyWithoutEngagementInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementCreateNestedManyWithoutEngagementInput>;
export const StaffingPlacementCreateNestedManyWithoutEngagementInputObjectZodSchema = makeSchema();
