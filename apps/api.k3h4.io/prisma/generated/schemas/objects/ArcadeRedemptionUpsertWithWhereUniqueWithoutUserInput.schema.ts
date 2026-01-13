import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeRedemptionWhereUniqueInputObjectSchema as ArcadeRedemptionWhereUniqueInputObjectSchema } from './ArcadeRedemptionWhereUniqueInput.schema';
import { ArcadeRedemptionUpdateWithoutUserInputObjectSchema as ArcadeRedemptionUpdateWithoutUserInputObjectSchema } from './ArcadeRedemptionUpdateWithoutUserInput.schema';
import { ArcadeRedemptionUncheckedUpdateWithoutUserInputObjectSchema as ArcadeRedemptionUncheckedUpdateWithoutUserInputObjectSchema } from './ArcadeRedemptionUncheckedUpdateWithoutUserInput.schema';
import { ArcadeRedemptionCreateWithoutUserInputObjectSchema as ArcadeRedemptionCreateWithoutUserInputObjectSchema } from './ArcadeRedemptionCreateWithoutUserInput.schema';
import { ArcadeRedemptionUncheckedCreateWithoutUserInputObjectSchema as ArcadeRedemptionUncheckedCreateWithoutUserInputObjectSchema } from './ArcadeRedemptionUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ArcadeRedemptionUpdateWithoutUserInputObjectSchema), z.lazy(() => ArcadeRedemptionUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => ArcadeRedemptionCreateWithoutUserInputObjectSchema), z.lazy(() => ArcadeRedemptionUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const ArcadeRedemptionUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionUpsertWithWhereUniqueWithoutUserInput>;
export const ArcadeRedemptionUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
