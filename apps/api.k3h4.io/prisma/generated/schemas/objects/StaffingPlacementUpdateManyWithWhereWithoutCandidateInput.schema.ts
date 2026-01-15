import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingPlacementScalarWhereInputObjectSchema as StaffingPlacementScalarWhereInputObjectSchema } from './StaffingPlacementScalarWhereInput.schema';
import { StaffingPlacementUpdateManyMutationInputObjectSchema as StaffingPlacementUpdateManyMutationInputObjectSchema } from './StaffingPlacementUpdateManyMutationInput.schema';
import { StaffingPlacementUncheckedUpdateManyWithoutCandidateInputObjectSchema as StaffingPlacementUncheckedUpdateManyWithoutCandidateInputObjectSchema } from './StaffingPlacementUncheckedUpdateManyWithoutCandidateInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingPlacementScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => StaffingPlacementUpdateManyMutationInputObjectSchema), z.lazy(() => StaffingPlacementUncheckedUpdateManyWithoutCandidateInputObjectSchema)])
}).strict();
export const StaffingPlacementUpdateManyWithWhereWithoutCandidateInputObjectSchema: z.ZodType<Prisma.StaffingPlacementUpdateManyWithWhereWithoutCandidateInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementUpdateManyWithWhereWithoutCandidateInput>;
export const StaffingPlacementUpdateManyWithWhereWithoutCandidateInputObjectZodSchema = makeSchema();
