import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingEngagementCreateWithoutUserInputObjectSchema as StaffingEngagementCreateWithoutUserInputObjectSchema } from './StaffingEngagementCreateWithoutUserInput.schema';
import { StaffingEngagementUncheckedCreateWithoutUserInputObjectSchema as StaffingEngagementUncheckedCreateWithoutUserInputObjectSchema } from './StaffingEngagementUncheckedCreateWithoutUserInput.schema';
import { StaffingEngagementCreateOrConnectWithoutUserInputObjectSchema as StaffingEngagementCreateOrConnectWithoutUserInputObjectSchema } from './StaffingEngagementCreateOrConnectWithoutUserInput.schema';
import { StaffingEngagementCreateManyUserInputEnvelopeObjectSchema as StaffingEngagementCreateManyUserInputEnvelopeObjectSchema } from './StaffingEngagementCreateManyUserInputEnvelope.schema';
import { StaffingEngagementWhereUniqueInputObjectSchema as StaffingEngagementWhereUniqueInputObjectSchema } from './StaffingEngagementWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingEngagementCreateWithoutUserInputObjectSchema), z.lazy(() => StaffingEngagementCreateWithoutUserInputObjectSchema).array(), z.lazy(() => StaffingEngagementUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => StaffingEngagementUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StaffingEngagementCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => StaffingEngagementCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StaffingEngagementCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => StaffingEngagementWhereUniqueInputObjectSchema), z.lazy(() => StaffingEngagementWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const StaffingEngagementUncheckedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.StaffingEngagementUncheckedCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingEngagementUncheckedCreateNestedManyWithoutUserInput>;
export const StaffingEngagementUncheckedCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
