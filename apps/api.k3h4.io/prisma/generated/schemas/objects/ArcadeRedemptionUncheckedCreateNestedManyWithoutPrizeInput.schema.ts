import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeRedemptionCreateWithoutPrizeInputObjectSchema as ArcadeRedemptionCreateWithoutPrizeInputObjectSchema } from './ArcadeRedemptionCreateWithoutPrizeInput.schema';
import { ArcadeRedemptionUncheckedCreateWithoutPrizeInputObjectSchema as ArcadeRedemptionUncheckedCreateWithoutPrizeInputObjectSchema } from './ArcadeRedemptionUncheckedCreateWithoutPrizeInput.schema';
import { ArcadeRedemptionCreateOrConnectWithoutPrizeInputObjectSchema as ArcadeRedemptionCreateOrConnectWithoutPrizeInputObjectSchema } from './ArcadeRedemptionCreateOrConnectWithoutPrizeInput.schema';
import { ArcadeRedemptionCreateManyPrizeInputEnvelopeObjectSchema as ArcadeRedemptionCreateManyPrizeInputEnvelopeObjectSchema } from './ArcadeRedemptionCreateManyPrizeInputEnvelope.schema';
import { ArcadeRedemptionWhereUniqueInputObjectSchema as ArcadeRedemptionWhereUniqueInputObjectSchema } from './ArcadeRedemptionWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ArcadeRedemptionCreateWithoutPrizeInputObjectSchema), z.lazy(() => ArcadeRedemptionCreateWithoutPrizeInputObjectSchema).array(), z.lazy(() => ArcadeRedemptionUncheckedCreateWithoutPrizeInputObjectSchema), z.lazy(() => ArcadeRedemptionUncheckedCreateWithoutPrizeInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ArcadeRedemptionCreateOrConnectWithoutPrizeInputObjectSchema), z.lazy(() => ArcadeRedemptionCreateOrConnectWithoutPrizeInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ArcadeRedemptionCreateManyPrizeInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema), z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ArcadeRedemptionUncheckedCreateNestedManyWithoutPrizeInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionUncheckedCreateNestedManyWithoutPrizeInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionUncheckedCreateNestedManyWithoutPrizeInput>;
export const ArcadeRedemptionUncheckedCreateNestedManyWithoutPrizeInputObjectZodSchema = makeSchema();
