import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingPlacementWhereUniqueInputObjectSchema as StaffingPlacementWhereUniqueInputObjectSchema } from './StaffingPlacementWhereUniqueInput.schema';
import { StaffingPlacementCreateWithoutPersonaInputObjectSchema as StaffingPlacementCreateWithoutPersonaInputObjectSchema } from './StaffingPlacementCreateWithoutPersonaInput.schema';
import { StaffingPlacementUncheckedCreateWithoutPersonaInputObjectSchema as StaffingPlacementUncheckedCreateWithoutPersonaInputObjectSchema } from './StaffingPlacementUncheckedCreateWithoutPersonaInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => StaffingPlacementCreateWithoutPersonaInputObjectSchema), z.lazy(() => StaffingPlacementUncheckedCreateWithoutPersonaInputObjectSchema)])
}).strict();
export const StaffingPlacementCreateOrConnectWithoutPersonaInputObjectSchema: z.ZodType<Prisma.StaffingPlacementCreateOrConnectWithoutPersonaInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementCreateOrConnectWithoutPersonaInput>;
export const StaffingPlacementCreateOrConnectWithoutPersonaInputObjectZodSchema = makeSchema();
