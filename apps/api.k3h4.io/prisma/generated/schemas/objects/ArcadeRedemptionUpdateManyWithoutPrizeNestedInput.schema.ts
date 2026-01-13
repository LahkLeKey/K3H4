import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeRedemptionCreateWithoutPrizeInputObjectSchema as ArcadeRedemptionCreateWithoutPrizeInputObjectSchema } from './ArcadeRedemptionCreateWithoutPrizeInput.schema';
import { ArcadeRedemptionUncheckedCreateWithoutPrizeInputObjectSchema as ArcadeRedemptionUncheckedCreateWithoutPrizeInputObjectSchema } from './ArcadeRedemptionUncheckedCreateWithoutPrizeInput.schema';
import { ArcadeRedemptionCreateOrConnectWithoutPrizeInputObjectSchema as ArcadeRedemptionCreateOrConnectWithoutPrizeInputObjectSchema } from './ArcadeRedemptionCreateOrConnectWithoutPrizeInput.schema';
import { ArcadeRedemptionUpsertWithWhereUniqueWithoutPrizeInputObjectSchema as ArcadeRedemptionUpsertWithWhereUniqueWithoutPrizeInputObjectSchema } from './ArcadeRedemptionUpsertWithWhereUniqueWithoutPrizeInput.schema';
import { ArcadeRedemptionCreateManyPrizeInputEnvelopeObjectSchema as ArcadeRedemptionCreateManyPrizeInputEnvelopeObjectSchema } from './ArcadeRedemptionCreateManyPrizeInputEnvelope.schema';
import { ArcadeRedemptionWhereUniqueInputObjectSchema as ArcadeRedemptionWhereUniqueInputObjectSchema } from './ArcadeRedemptionWhereUniqueInput.schema';
import { ArcadeRedemptionUpdateWithWhereUniqueWithoutPrizeInputObjectSchema as ArcadeRedemptionUpdateWithWhereUniqueWithoutPrizeInputObjectSchema } from './ArcadeRedemptionUpdateWithWhereUniqueWithoutPrizeInput.schema';
import { ArcadeRedemptionUpdateManyWithWhereWithoutPrizeInputObjectSchema as ArcadeRedemptionUpdateManyWithWhereWithoutPrizeInputObjectSchema } from './ArcadeRedemptionUpdateManyWithWhereWithoutPrizeInput.schema';
import { ArcadeRedemptionScalarWhereInputObjectSchema as ArcadeRedemptionScalarWhereInputObjectSchema } from './ArcadeRedemptionScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ArcadeRedemptionCreateWithoutPrizeInputObjectSchema), z.lazy(() => ArcadeRedemptionCreateWithoutPrizeInputObjectSchema).array(), z.lazy(() => ArcadeRedemptionUncheckedCreateWithoutPrizeInputObjectSchema), z.lazy(() => ArcadeRedemptionUncheckedCreateWithoutPrizeInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ArcadeRedemptionCreateOrConnectWithoutPrizeInputObjectSchema), z.lazy(() => ArcadeRedemptionCreateOrConnectWithoutPrizeInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ArcadeRedemptionUpsertWithWhereUniqueWithoutPrizeInputObjectSchema), z.lazy(() => ArcadeRedemptionUpsertWithWhereUniqueWithoutPrizeInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ArcadeRedemptionCreateManyPrizeInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema), z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema), z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema), z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema), z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ArcadeRedemptionUpdateWithWhereUniqueWithoutPrizeInputObjectSchema), z.lazy(() => ArcadeRedemptionUpdateWithWhereUniqueWithoutPrizeInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ArcadeRedemptionUpdateManyWithWhereWithoutPrizeInputObjectSchema), z.lazy(() => ArcadeRedemptionUpdateManyWithWhereWithoutPrizeInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ArcadeRedemptionScalarWhereInputObjectSchema), z.lazy(() => ArcadeRedemptionScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ArcadeRedemptionUpdateManyWithoutPrizeNestedInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionUpdateManyWithoutPrizeNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionUpdateManyWithoutPrizeNestedInput>;
export const ArcadeRedemptionUpdateManyWithoutPrizeNestedInputObjectZodSchema = makeSchema();
