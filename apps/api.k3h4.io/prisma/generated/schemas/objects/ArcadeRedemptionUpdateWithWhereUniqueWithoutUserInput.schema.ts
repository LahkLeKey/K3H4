import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeRedemptionWhereUniqueInputObjectSchema as ArcadeRedemptionWhereUniqueInputObjectSchema } from './ArcadeRedemptionWhereUniqueInput.schema';
import { ArcadeRedemptionUpdateWithoutUserInputObjectSchema as ArcadeRedemptionUpdateWithoutUserInputObjectSchema } from './ArcadeRedemptionUpdateWithoutUserInput.schema';
import { ArcadeRedemptionUncheckedUpdateWithoutUserInputObjectSchema as ArcadeRedemptionUncheckedUpdateWithoutUserInputObjectSchema } from './ArcadeRedemptionUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ArcadeRedemptionUpdateWithoutUserInputObjectSchema), z.lazy(() => ArcadeRedemptionUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const ArcadeRedemptionUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionUpdateWithWhereUniqueWithoutUserInput>;
export const ArcadeRedemptionUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
