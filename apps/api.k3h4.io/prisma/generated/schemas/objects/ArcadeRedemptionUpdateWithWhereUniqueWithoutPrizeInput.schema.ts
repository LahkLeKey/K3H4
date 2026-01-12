import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeRedemptionWhereUniqueInputObjectSchema as ArcadeRedemptionWhereUniqueInputObjectSchema } from './ArcadeRedemptionWhereUniqueInput.schema';
import { ArcadeRedemptionUpdateWithoutPrizeInputObjectSchema as ArcadeRedemptionUpdateWithoutPrizeInputObjectSchema } from './ArcadeRedemptionUpdateWithoutPrizeInput.schema';
import { ArcadeRedemptionUncheckedUpdateWithoutPrizeInputObjectSchema as ArcadeRedemptionUncheckedUpdateWithoutPrizeInputObjectSchema } from './ArcadeRedemptionUncheckedUpdateWithoutPrizeInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ArcadeRedemptionUpdateWithoutPrizeInputObjectSchema), z.lazy(() => ArcadeRedemptionUncheckedUpdateWithoutPrizeInputObjectSchema)])
}).strict();
export const ArcadeRedemptionUpdateWithWhereUniqueWithoutPrizeInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionUpdateWithWhereUniqueWithoutPrizeInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionUpdateWithWhereUniqueWithoutPrizeInput>;
export const ArcadeRedemptionUpdateWithWhereUniqueWithoutPrizeInputObjectZodSchema = makeSchema();
