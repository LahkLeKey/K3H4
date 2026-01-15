import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingPlacementWhereUniqueInputObjectSchema as StaffingPlacementWhereUniqueInputObjectSchema } from './StaffingPlacementWhereUniqueInput.schema';
import { StaffingPlacementUpdateWithoutUserInputObjectSchema as StaffingPlacementUpdateWithoutUserInputObjectSchema } from './StaffingPlacementUpdateWithoutUserInput.schema';
import { StaffingPlacementUncheckedUpdateWithoutUserInputObjectSchema as StaffingPlacementUncheckedUpdateWithoutUserInputObjectSchema } from './StaffingPlacementUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => StaffingPlacementUpdateWithoutUserInputObjectSchema), z.lazy(() => StaffingPlacementUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const StaffingPlacementUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.StaffingPlacementUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementUpdateWithWhereUniqueWithoutUserInput>;
export const StaffingPlacementUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
