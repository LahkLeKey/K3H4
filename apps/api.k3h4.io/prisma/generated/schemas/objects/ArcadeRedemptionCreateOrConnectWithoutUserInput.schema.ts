import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeRedemptionWhereUniqueInputObjectSchema as ArcadeRedemptionWhereUniqueInputObjectSchema } from './ArcadeRedemptionWhereUniqueInput.schema';
import { ArcadeRedemptionCreateWithoutUserInputObjectSchema as ArcadeRedemptionCreateWithoutUserInputObjectSchema } from './ArcadeRedemptionCreateWithoutUserInput.schema';
import { ArcadeRedemptionUncheckedCreateWithoutUserInputObjectSchema as ArcadeRedemptionUncheckedCreateWithoutUserInputObjectSchema } from './ArcadeRedemptionUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ArcadeRedemptionCreateWithoutUserInputObjectSchema), z.lazy(() => ArcadeRedemptionUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const ArcadeRedemptionCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionCreateOrConnectWithoutUserInput>;
export const ArcadeRedemptionCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
