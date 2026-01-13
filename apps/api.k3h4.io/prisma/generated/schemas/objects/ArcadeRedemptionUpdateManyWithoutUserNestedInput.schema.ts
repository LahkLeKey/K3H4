import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeRedemptionCreateWithoutUserInputObjectSchema as ArcadeRedemptionCreateWithoutUserInputObjectSchema } from './ArcadeRedemptionCreateWithoutUserInput.schema';
import { ArcadeRedemptionUncheckedCreateWithoutUserInputObjectSchema as ArcadeRedemptionUncheckedCreateWithoutUserInputObjectSchema } from './ArcadeRedemptionUncheckedCreateWithoutUserInput.schema';
import { ArcadeRedemptionCreateOrConnectWithoutUserInputObjectSchema as ArcadeRedemptionCreateOrConnectWithoutUserInputObjectSchema } from './ArcadeRedemptionCreateOrConnectWithoutUserInput.schema';
import { ArcadeRedemptionUpsertWithWhereUniqueWithoutUserInputObjectSchema as ArcadeRedemptionUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './ArcadeRedemptionUpsertWithWhereUniqueWithoutUserInput.schema';
import { ArcadeRedemptionCreateManyUserInputEnvelopeObjectSchema as ArcadeRedemptionCreateManyUserInputEnvelopeObjectSchema } from './ArcadeRedemptionCreateManyUserInputEnvelope.schema';
import { ArcadeRedemptionWhereUniqueInputObjectSchema as ArcadeRedemptionWhereUniqueInputObjectSchema } from './ArcadeRedemptionWhereUniqueInput.schema';
import { ArcadeRedemptionUpdateWithWhereUniqueWithoutUserInputObjectSchema as ArcadeRedemptionUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './ArcadeRedemptionUpdateWithWhereUniqueWithoutUserInput.schema';
import { ArcadeRedemptionUpdateManyWithWhereWithoutUserInputObjectSchema as ArcadeRedemptionUpdateManyWithWhereWithoutUserInputObjectSchema } from './ArcadeRedemptionUpdateManyWithWhereWithoutUserInput.schema';
import { ArcadeRedemptionScalarWhereInputObjectSchema as ArcadeRedemptionScalarWhereInputObjectSchema } from './ArcadeRedemptionScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ArcadeRedemptionCreateWithoutUserInputObjectSchema), z.lazy(() => ArcadeRedemptionCreateWithoutUserInputObjectSchema).array(), z.lazy(() => ArcadeRedemptionUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => ArcadeRedemptionUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ArcadeRedemptionCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => ArcadeRedemptionCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ArcadeRedemptionUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => ArcadeRedemptionUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ArcadeRedemptionCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema), z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema), z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema), z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema), z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ArcadeRedemptionUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => ArcadeRedemptionUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ArcadeRedemptionUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => ArcadeRedemptionUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ArcadeRedemptionScalarWhereInputObjectSchema), z.lazy(() => ArcadeRedemptionScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ArcadeRedemptionUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionUpdateManyWithoutUserNestedInput>;
export const ArcadeRedemptionUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
