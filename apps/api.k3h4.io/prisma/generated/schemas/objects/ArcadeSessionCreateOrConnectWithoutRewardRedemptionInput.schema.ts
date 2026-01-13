import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeSessionWhereUniqueInputObjectSchema as ArcadeSessionWhereUniqueInputObjectSchema } from './ArcadeSessionWhereUniqueInput.schema';
import { ArcadeSessionCreateWithoutRewardRedemptionInputObjectSchema as ArcadeSessionCreateWithoutRewardRedemptionInputObjectSchema } from './ArcadeSessionCreateWithoutRewardRedemptionInput.schema';
import { ArcadeSessionUncheckedCreateWithoutRewardRedemptionInputObjectSchema as ArcadeSessionUncheckedCreateWithoutRewardRedemptionInputObjectSchema } from './ArcadeSessionUncheckedCreateWithoutRewardRedemptionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ArcadeSessionCreateWithoutRewardRedemptionInputObjectSchema), z.lazy(() => ArcadeSessionUncheckedCreateWithoutRewardRedemptionInputObjectSchema)])
}).strict();
export const ArcadeSessionCreateOrConnectWithoutRewardRedemptionInputObjectSchema: z.ZodType<Prisma.ArcadeSessionCreateOrConnectWithoutRewardRedemptionInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionCreateOrConnectWithoutRewardRedemptionInput>;
export const ArcadeSessionCreateOrConnectWithoutRewardRedemptionInputObjectZodSchema = makeSchema();
