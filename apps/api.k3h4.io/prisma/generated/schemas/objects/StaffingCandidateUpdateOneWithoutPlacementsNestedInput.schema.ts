import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingCandidateCreateWithoutPlacementsInputObjectSchema as StaffingCandidateCreateWithoutPlacementsInputObjectSchema } from './StaffingCandidateCreateWithoutPlacementsInput.schema';
import { StaffingCandidateUncheckedCreateWithoutPlacementsInputObjectSchema as StaffingCandidateUncheckedCreateWithoutPlacementsInputObjectSchema } from './StaffingCandidateUncheckedCreateWithoutPlacementsInput.schema';
import { StaffingCandidateCreateOrConnectWithoutPlacementsInputObjectSchema as StaffingCandidateCreateOrConnectWithoutPlacementsInputObjectSchema } from './StaffingCandidateCreateOrConnectWithoutPlacementsInput.schema';
import { StaffingCandidateUpsertWithoutPlacementsInputObjectSchema as StaffingCandidateUpsertWithoutPlacementsInputObjectSchema } from './StaffingCandidateUpsertWithoutPlacementsInput.schema';
import { StaffingCandidateWhereInputObjectSchema as StaffingCandidateWhereInputObjectSchema } from './StaffingCandidateWhereInput.schema';
import { StaffingCandidateWhereUniqueInputObjectSchema as StaffingCandidateWhereUniqueInputObjectSchema } from './StaffingCandidateWhereUniqueInput.schema';
import { StaffingCandidateUpdateToOneWithWhereWithoutPlacementsInputObjectSchema as StaffingCandidateUpdateToOneWithWhereWithoutPlacementsInputObjectSchema } from './StaffingCandidateUpdateToOneWithWhereWithoutPlacementsInput.schema';
import { StaffingCandidateUpdateWithoutPlacementsInputObjectSchema as StaffingCandidateUpdateWithoutPlacementsInputObjectSchema } from './StaffingCandidateUpdateWithoutPlacementsInput.schema';
import { StaffingCandidateUncheckedUpdateWithoutPlacementsInputObjectSchema as StaffingCandidateUncheckedUpdateWithoutPlacementsInputObjectSchema } from './StaffingCandidateUncheckedUpdateWithoutPlacementsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingCandidateCreateWithoutPlacementsInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedCreateWithoutPlacementsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => StaffingCandidateCreateOrConnectWithoutPlacementsInputObjectSchema).optional(),
  upsert: z.lazy(() => StaffingCandidateUpsertWithoutPlacementsInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => StaffingCandidateWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => StaffingCandidateWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => StaffingCandidateWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => StaffingCandidateUpdateToOneWithWhereWithoutPlacementsInputObjectSchema), z.lazy(() => StaffingCandidateUpdateWithoutPlacementsInputObjectSchema), z.lazy(() => StaffingCandidateUncheckedUpdateWithoutPlacementsInputObjectSchema)]).optional()
}).strict();
export const StaffingCandidateUpdateOneWithoutPlacementsNestedInputObjectSchema: z.ZodType<Prisma.StaffingCandidateUpdateOneWithoutPlacementsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateUpdateOneWithoutPlacementsNestedInput>;
export const StaffingCandidateUpdateOneWithoutPlacementsNestedInputObjectZodSchema = makeSchema();
