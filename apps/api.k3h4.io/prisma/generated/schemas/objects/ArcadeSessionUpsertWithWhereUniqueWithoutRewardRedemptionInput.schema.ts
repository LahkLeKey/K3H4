import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeSessionWhereUniqueInputObjectSchema as ArcadeSessionWhereUniqueInputObjectSchema } from './ArcadeSessionWhereUniqueInput.schema';
import { ArcadeSessionUpdateWithoutRewardRedemptionInputObjectSchema as ArcadeSessionUpdateWithoutRewardRedemptionInputObjectSchema } from './ArcadeSessionUpdateWithoutRewardRedemptionInput.schema';
import { ArcadeSessionUncheckedUpdateWithoutRewardRedemptionInputObjectSchema as ArcadeSessionUncheckedUpdateWithoutRewardRedemptionInputObjectSchema } from './ArcadeSessionUncheckedUpdateWithoutRewardRedemptionInput.schema';
import { ArcadeSessionCreateWithoutRewardRedemptionInputObjectSchema as ArcadeSessionCreateWithoutRewardRedemptionInputObjectSchema } from './ArcadeSessionCreateWithoutRewardRedemptionInput.schema';
import { ArcadeSessionUncheckedCreateWithoutRewardRedemptionInputObjectSchema as ArcadeSessionUncheckedCreateWithoutRewardRedemptionInputObjectSchema } from './ArcadeSessionUncheckedCreateWithoutRewardRedemptionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ArcadeSessionUpdateWithoutRewardRedemptionInputObjectSchema), z.lazy(() => ArcadeSessionUncheckedUpdateWithoutRewardRedemptionInputObjectSchema)]),
  create: z.union([z.lazy(() => ArcadeSessionCreateWithoutRewardRedemptionInputObjectSchema), z.lazy(() => ArcadeSessionUncheckedCreateWithoutRewardRedemptionInputObjectSchema)])
}).strict();
export const ArcadeSessionUpsertWithWhereUniqueWithoutRewardRedemptionInputObjectSchema: z.ZodType<Prisma.ArcadeSessionUpsertWithWhereUniqueWithoutRewardRedemptionInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionUpsertWithWhereUniqueWithoutRewardRedemptionInput>;
export const ArcadeSessionUpsertWithWhereUniqueWithoutRewardRedemptionInputObjectZodSchema = makeSchema();
