import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingPlacementWhereUniqueInputObjectSchema as StaffingPlacementWhereUniqueInputObjectSchema } from './StaffingPlacementWhereUniqueInput.schema';
import { StaffingPlacementUpdateWithoutPersonaInputObjectSchema as StaffingPlacementUpdateWithoutPersonaInputObjectSchema } from './StaffingPlacementUpdateWithoutPersonaInput.schema';
import { StaffingPlacementUncheckedUpdateWithoutPersonaInputObjectSchema as StaffingPlacementUncheckedUpdateWithoutPersonaInputObjectSchema } from './StaffingPlacementUncheckedUpdateWithoutPersonaInput.schema';
import { StaffingPlacementCreateWithoutPersonaInputObjectSchema as StaffingPlacementCreateWithoutPersonaInputObjectSchema } from './StaffingPlacementCreateWithoutPersonaInput.schema';
import { StaffingPlacementUncheckedCreateWithoutPersonaInputObjectSchema as StaffingPlacementUncheckedCreateWithoutPersonaInputObjectSchema } from './StaffingPlacementUncheckedCreateWithoutPersonaInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => StaffingPlacementUpdateWithoutPersonaInputObjectSchema), z.lazy(() => StaffingPlacementUncheckedUpdateWithoutPersonaInputObjectSchema)]),
  create: z.union([z.lazy(() => StaffingPlacementCreateWithoutPersonaInputObjectSchema), z.lazy(() => StaffingPlacementUncheckedCreateWithoutPersonaInputObjectSchema)])
}).strict();
export const StaffingPlacementUpsertWithWhereUniqueWithoutPersonaInputObjectSchema: z.ZodType<Prisma.StaffingPlacementUpsertWithWhereUniqueWithoutPersonaInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementUpsertWithWhereUniqueWithoutPersonaInput>;
export const StaffingPlacementUpsertWithWhereUniqueWithoutPersonaInputObjectZodSchema = makeSchema();
