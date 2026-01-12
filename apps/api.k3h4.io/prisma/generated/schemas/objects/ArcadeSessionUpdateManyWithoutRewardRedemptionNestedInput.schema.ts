import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeSessionCreateWithoutRewardRedemptionInputObjectSchema as ArcadeSessionCreateWithoutRewardRedemptionInputObjectSchema } from './ArcadeSessionCreateWithoutRewardRedemptionInput.schema';
import { ArcadeSessionUncheckedCreateWithoutRewardRedemptionInputObjectSchema as ArcadeSessionUncheckedCreateWithoutRewardRedemptionInputObjectSchema } from './ArcadeSessionUncheckedCreateWithoutRewardRedemptionInput.schema';
import { ArcadeSessionCreateOrConnectWithoutRewardRedemptionInputObjectSchema as ArcadeSessionCreateOrConnectWithoutRewardRedemptionInputObjectSchema } from './ArcadeSessionCreateOrConnectWithoutRewardRedemptionInput.schema';
import { ArcadeSessionUpsertWithWhereUniqueWithoutRewardRedemptionInputObjectSchema as ArcadeSessionUpsertWithWhereUniqueWithoutRewardRedemptionInputObjectSchema } from './ArcadeSessionUpsertWithWhereUniqueWithoutRewardRedemptionInput.schema';
import { ArcadeSessionCreateManyRewardRedemptionInputEnvelopeObjectSchema as ArcadeSessionCreateManyRewardRedemptionInputEnvelopeObjectSchema } from './ArcadeSessionCreateManyRewardRedemptionInputEnvelope.schema';
import { ArcadeSessionWhereUniqueInputObjectSchema as ArcadeSessionWhereUniqueInputObjectSchema } from './ArcadeSessionWhereUniqueInput.schema';
import { ArcadeSessionUpdateWithWhereUniqueWithoutRewardRedemptionInputObjectSchema as ArcadeSessionUpdateWithWhereUniqueWithoutRewardRedemptionInputObjectSchema } from './ArcadeSessionUpdateWithWhereUniqueWithoutRewardRedemptionInput.schema';
import { ArcadeSessionUpdateManyWithWhereWithoutRewardRedemptionInputObjectSchema as ArcadeSessionUpdateManyWithWhereWithoutRewardRedemptionInputObjectSchema } from './ArcadeSessionUpdateManyWithWhereWithoutRewardRedemptionInput.schema';
import { ArcadeSessionScalarWhereInputObjectSchema as ArcadeSessionScalarWhereInputObjectSchema } from './ArcadeSessionScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ArcadeSessionCreateWithoutRewardRedemptionInputObjectSchema), z.lazy(() => ArcadeSessionCreateWithoutRewardRedemptionInputObjectSchema).array(), z.lazy(() => ArcadeSessionUncheckedCreateWithoutRewardRedemptionInputObjectSchema), z.lazy(() => ArcadeSessionUncheckedCreateWithoutRewardRedemptionInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ArcadeSessionCreateOrConnectWithoutRewardRedemptionInputObjectSchema), z.lazy(() => ArcadeSessionCreateOrConnectWithoutRewardRedemptionInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ArcadeSessionUpsertWithWhereUniqueWithoutRewardRedemptionInputObjectSchema), z.lazy(() => ArcadeSessionUpsertWithWhereUniqueWithoutRewardRedemptionInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ArcadeSessionCreateManyRewardRedemptionInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema), z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema), z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema), z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema), z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ArcadeSessionUpdateWithWhereUniqueWithoutRewardRedemptionInputObjectSchema), z.lazy(() => ArcadeSessionUpdateWithWhereUniqueWithoutRewardRedemptionInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ArcadeSessionUpdateManyWithWhereWithoutRewardRedemptionInputObjectSchema), z.lazy(() => ArcadeSessionUpdateManyWithWhereWithoutRewardRedemptionInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ArcadeSessionScalarWhereInputObjectSchema), z.lazy(() => ArcadeSessionScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ArcadeSessionUpdateManyWithoutRewardRedemptionNestedInputObjectSchema: z.ZodType<Prisma.ArcadeSessionUpdateManyWithoutRewardRedemptionNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionUpdateManyWithoutRewardRedemptionNestedInput>;
export const ArcadeSessionUpdateManyWithoutRewardRedemptionNestedInputObjectZodSchema = makeSchema();
