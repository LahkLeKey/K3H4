import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeRedemptionWhereUniqueInputObjectSchema as ArcadeRedemptionWhereUniqueInputObjectSchema } from './ArcadeRedemptionWhereUniqueInput.schema';
import { ArcadeRedemptionCreateWithoutPrizeInputObjectSchema as ArcadeRedemptionCreateWithoutPrizeInputObjectSchema } from './ArcadeRedemptionCreateWithoutPrizeInput.schema';
import { ArcadeRedemptionUncheckedCreateWithoutPrizeInputObjectSchema as ArcadeRedemptionUncheckedCreateWithoutPrizeInputObjectSchema } from './ArcadeRedemptionUncheckedCreateWithoutPrizeInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ArcadeRedemptionCreateWithoutPrizeInputObjectSchema), z.lazy(() => ArcadeRedemptionUncheckedCreateWithoutPrizeInputObjectSchema)])
}).strict();
export const ArcadeRedemptionCreateOrConnectWithoutPrizeInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionCreateOrConnectWithoutPrizeInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionCreateOrConnectWithoutPrizeInput>;
export const ArcadeRedemptionCreateOrConnectWithoutPrizeInputObjectZodSchema = makeSchema();
