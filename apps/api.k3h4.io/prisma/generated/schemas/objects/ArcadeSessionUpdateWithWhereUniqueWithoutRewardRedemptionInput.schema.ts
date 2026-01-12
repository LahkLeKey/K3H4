import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeSessionWhereUniqueInputObjectSchema as ArcadeSessionWhereUniqueInputObjectSchema } from './ArcadeSessionWhereUniqueInput.schema';
import { ArcadeSessionUpdateWithoutRewardRedemptionInputObjectSchema as ArcadeSessionUpdateWithoutRewardRedemptionInputObjectSchema } from './ArcadeSessionUpdateWithoutRewardRedemptionInput.schema';
import { ArcadeSessionUncheckedUpdateWithoutRewardRedemptionInputObjectSchema as ArcadeSessionUncheckedUpdateWithoutRewardRedemptionInputObjectSchema } from './ArcadeSessionUncheckedUpdateWithoutRewardRedemptionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ArcadeSessionUpdateWithoutRewardRedemptionInputObjectSchema), z.lazy(() => ArcadeSessionUncheckedUpdateWithoutRewardRedemptionInputObjectSchema)])
}).strict();
export const ArcadeSessionUpdateWithWhereUniqueWithoutRewardRedemptionInputObjectSchema: z.ZodType<Prisma.ArcadeSessionUpdateWithWhereUniqueWithoutRewardRedemptionInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionUpdateWithWhereUniqueWithoutRewardRedemptionInput>;
export const ArcadeSessionUpdateWithWhereUniqueWithoutRewardRedemptionInputObjectZodSchema = makeSchema();
