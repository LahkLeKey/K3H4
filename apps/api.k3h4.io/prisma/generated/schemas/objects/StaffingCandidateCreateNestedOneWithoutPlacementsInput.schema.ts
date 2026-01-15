import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateCreateWithoutPlacementsInputObjectSchema as StaffingCandidateCreateWithoutPlacementsInputObjectSchema } from './StaffingCandidateCreateWithoutPlacementsInput.schema';
import { StaffingCandidateUncheckedCreateWithoutPlacementsInputObjectSchema as StaffingCandidateUncheckedCreateWithoutPlacementsInputObjectSchema } from './StaffingCandidateUncheckedCreateWithoutPlacementsInput.schema';
import { StaffingCandidateCreateOrConnectWithoutPlacementsInputObjectSchema as StaffingCandidateCreateOrConnectWithoutPlacementsInputObjectSchema } from './StaffingCandidateCreateOrConnectWithoutPlacementsInput.schema';
import { StaffingCandidateWhereUniqueInputObjectSchema as StaffingCandidateWhereUniqueInputObjectSchema } from './StaffingCandidateWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingCandidateCreateWithoutPlacementsInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedCreateWithoutPlacementsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => StaffingCandidateCreateOrConnectWithoutPlacementsInputObjectSchema).optional(),
  connect: z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema).optional()
}).strict();
export const StaffingCandidateCreateNestedOneWithoutPlacementsInputObjectSchema: z.ZodType<Prisma.StaffingCandidateCreateNestedOneWithoutPlacementsInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateCreateNestedOneWithoutPlacementsInput>;
export const StaffingCandidateCreateNestedOneWithoutPlacementsInputObjectZodSchema = makeSchema();
