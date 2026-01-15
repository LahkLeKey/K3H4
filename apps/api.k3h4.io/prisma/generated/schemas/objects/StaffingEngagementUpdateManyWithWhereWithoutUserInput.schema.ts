import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingEngagementScalarWhereInputObjectSchema as StaffingEngagementScalarWhereInputObjectSchema } from './StaffingEngagementScalarWhereInput.schema';
import { StaffingEngagementUpdateManyMutationInputObjectSchema as StaffingEngagementUpdateManyMutationInputObjectSchema } from './StaffingEngagementUpdateManyMutationInput.schema';
import { StaffingEngagementUncheckedUpdateManyWithoutUserInputObjectSchema as StaffingEngagementUncheckedUpdateManyWithoutUserInputObjectSchema } from './StaffingEngagementUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingEngagementScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => StaffingEngagementUpdateManyMutationInputObjectSchema), z.lazy(() => StaffingEngagementUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const StaffingEngagementUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.StaffingEngagementUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingEngagementUpdateManyWithWhereWithoutUserInput>;
export const StaffingEngagementUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
