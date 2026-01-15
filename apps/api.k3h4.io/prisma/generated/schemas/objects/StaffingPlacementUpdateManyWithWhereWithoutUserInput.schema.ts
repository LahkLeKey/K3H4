import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingPlacementScalarWhereInputObjectSchema as StaffingPlacementScalarWhereInputObjectSchema } from './StaffingPlacementScalarWhereInput.schema';
import { StaffingPlacementUpdateManyMutationInputObjectSchema as StaffingPlacementUpdateManyMutationInputObjectSchema } from './StaffingPlacementUpdateManyMutationInput.schema';
import { StaffingPlacementUncheckedUpdateManyWithoutUserInputObjectSchema as StaffingPlacementUncheckedUpdateManyWithoutUserInputObjectSchema } from './StaffingPlacementUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingPlacementScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => StaffingPlacementUpdateManyMutationInputObjectSchema), z.lazy(() => StaffingPlacementUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const StaffingPlacementUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.StaffingPlacementUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementUpdateManyWithWhereWithoutUserInput>;
export const StaffingPlacementUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
