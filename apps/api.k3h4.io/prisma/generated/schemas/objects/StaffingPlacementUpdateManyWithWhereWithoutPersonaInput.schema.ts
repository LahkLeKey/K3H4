import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingPlacementScalarWhereInputObjectSchema as StaffingPlacementScalarWhereInputObjectSchema } from './StaffingPlacementScalarWhereInput.schema';
import { StaffingPlacementUpdateManyMutationInputObjectSchema as StaffingPlacementUpdateManyMutationInputObjectSchema } from './StaffingPlacementUpdateManyMutationInput.schema';
import { StaffingPlacementUncheckedUpdateManyWithoutPersonaInputObjectSchema as StaffingPlacementUncheckedUpdateManyWithoutPersonaInputObjectSchema } from './StaffingPlacementUncheckedUpdateManyWithoutPersonaInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingPlacementScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => StaffingPlacementUpdateManyMutationInputObjectSchema), z.lazy(() => StaffingPlacementUncheckedUpdateManyWithoutPersonaInputObjectSchema)])
}).strict();
export const StaffingPlacementUpdateManyWithWhereWithoutPersonaInputObjectSchema: z.ZodType<Prisma.StaffingPlacementUpdateManyWithWhereWithoutPersonaInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementUpdateManyWithWhereWithoutPersonaInput>;
export const StaffingPlacementUpdateManyWithWhereWithoutPersonaInputObjectZodSchema = makeSchema();
