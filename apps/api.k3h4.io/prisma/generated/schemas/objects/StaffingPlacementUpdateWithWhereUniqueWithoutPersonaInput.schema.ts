import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingPlacementWhereUniqueInputObjectSchema as StaffingPlacementWhereUniqueInputObjectSchema } from './StaffingPlacementWhereUniqueInput.schema';
import { StaffingPlacementUpdateWithoutPersonaInputObjectSchema as StaffingPlacementUpdateWithoutPersonaInputObjectSchema } from './StaffingPlacementUpdateWithoutPersonaInput.schema';
import { StaffingPlacementUncheckedUpdateWithoutPersonaInputObjectSchema as StaffingPlacementUncheckedUpdateWithoutPersonaInputObjectSchema } from './StaffingPlacementUncheckedUpdateWithoutPersonaInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => StaffingPlacementUpdateWithoutPersonaInputObjectSchema), z.lazy(() => StaffingPlacementUncheckedUpdateWithoutPersonaInputObjectSchema)])
}).strict();
export const StaffingPlacementUpdateWithWhereUniqueWithoutPersonaInputObjectSchema: z.ZodType<Prisma.StaffingPlacementUpdateWithWhereUniqueWithoutPersonaInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementUpdateWithWhereUniqueWithoutPersonaInput>;
export const StaffingPlacementUpdateWithWhereUniqueWithoutPersonaInputObjectZodSchema = makeSchema();
