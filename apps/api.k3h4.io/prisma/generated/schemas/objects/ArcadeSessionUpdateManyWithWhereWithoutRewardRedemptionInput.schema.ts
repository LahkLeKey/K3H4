import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeSessionScalarWhereInputObjectSchema as ArcadeSessionScalarWhereInputObjectSchema } from './ArcadeSessionScalarWhereInput.schema';
import { ArcadeSessionUpdateManyMutationInputObjectSchema as ArcadeSessionUpdateManyMutationInputObjectSchema } from './ArcadeSessionUpdateManyMutationInput.schema';
import { ArcadeSessionUncheckedUpdateManyWithoutRewardRedemptionInputObjectSchema as ArcadeSessionUncheckedUpdateManyWithoutRewardRedemptionInputObjectSchema } from './ArcadeSessionUncheckedUpdateManyWithoutRewardRedemptionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeSessionScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ArcadeSessionUpdateManyMutationInputObjectSchema), z.lazy(() => ArcadeSessionUncheckedUpdateManyWithoutRewardRedemptionInputObjectSchema)])
}).strict();
export const ArcadeSessionUpdateManyWithWhereWithoutRewardRedemptionInputObjectSchema: z.ZodType<Prisma.ArcadeSessionUpdateManyWithWhereWithoutRewardRedemptionInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionUpdateManyWithWhereWithoutRewardRedemptionInput>;
export const ArcadeSessionUpdateManyWithWhereWithoutRewardRedemptionInputObjectZodSchema = makeSchema();
