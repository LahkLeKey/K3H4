import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingPlacementWhereUniqueInputObjectSchema as StaffingPlacementWhereUniqueInputObjectSchema } from './StaffingPlacementWhereUniqueInput.schema';
import { StaffingPlacementCreateWithoutUserInputObjectSchema as StaffingPlacementCreateWithoutUserInputObjectSchema } from './StaffingPlacementCreateWithoutUserInput.schema';
import { StaffingPlacementUncheckedCreateWithoutUserInputObjectSchema as StaffingPlacementUncheckedCreateWithoutUserInputObjectSchema } from './StaffingPlacementUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => StaffingPlacementCreateWithoutUserInputObjectSchema), z.lazy(() => StaffingPlacementUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const StaffingPlacementCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.StaffingPlacementCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementCreateOrConnectWithoutUserInput>;
export const StaffingPlacementCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
