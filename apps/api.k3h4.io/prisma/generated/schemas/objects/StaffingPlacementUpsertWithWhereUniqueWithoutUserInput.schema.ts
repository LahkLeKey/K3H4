import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingPlacementWhereUniqueInputObjectSchema as StaffingPlacementWhereUniqueInputObjectSchema } from './StaffingPlacementWhereUniqueInput.schema';
import { StaffingPlacementUpdateWithoutUserInputObjectSchema as StaffingPlacementUpdateWithoutUserInputObjectSchema } from './StaffingPlacementUpdateWithoutUserInput.schema';
import { StaffingPlacementUncheckedUpdateWithoutUserInputObjectSchema as StaffingPlacementUncheckedUpdateWithoutUserInputObjectSchema } from './StaffingPlacementUncheckedUpdateWithoutUserInput.schema';
import { StaffingPlacementCreateWithoutUserInputObjectSchema as StaffingPlacementCreateWithoutUserInputObjectSchema } from './StaffingPlacementCreateWithoutUserInput.schema';
import { StaffingPlacementUncheckedCreateWithoutUserInputObjectSchema as StaffingPlacementUncheckedCreateWithoutUserInputObjectSchema } from './StaffingPlacementUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => StaffingPlacementUpdateWithoutUserInputObjectSchema), z.lazy(() => StaffingPlacementUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => StaffingPlacementCreateWithoutUserInputObjectSchema), z.lazy(() => StaffingPlacementUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const StaffingPlacementUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.StaffingPlacementUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementUpsertWithWhereUniqueWithoutUserInput>;
export const StaffingPlacementUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
