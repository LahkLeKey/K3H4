import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeSessionCreateWithoutRewardRedemptionInputObjectSchema as ArcadeSessionCreateWithoutRewardRedemptionInputObjectSchema } from './ArcadeSessionCreateWithoutRewardRedemptionInput.schema';
import { ArcadeSessionUncheckedCreateWithoutRewardRedemptionInputObjectSchema as ArcadeSessionUncheckedCreateWithoutRewardRedemptionInputObjectSchema } from './ArcadeSessionUncheckedCreateWithoutRewardRedemptionInput.schema';
import { ArcadeSessionCreateOrConnectWithoutRewardRedemptionInputObjectSchema as ArcadeSessionCreateOrConnectWithoutRewardRedemptionInputObjectSchema } from './ArcadeSessionCreateOrConnectWithoutRewardRedemptionInput.schema';
import { ArcadeSessionCreateManyRewardRedemptionInputEnvelopeObjectSchema as ArcadeSessionCreateManyRewardRedemptionInputEnvelopeObjectSchema } from './ArcadeSessionCreateManyRewardRedemptionInputEnvelope.schema';
import { ArcadeSessionWhereUniqueInputObjectSchema as ArcadeSessionWhereUniqueInputObjectSchema } from './ArcadeSessionWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ArcadeSessionCreateWithoutRewardRedemptionInputObjectSchema), z.lazy(() => ArcadeSessionCreateWithoutRewardRedemptionInputObjectSchema).array(), z.lazy(() => ArcadeSessionUncheckedCreateWithoutRewardRedemptionInputObjectSchema), z.lazy(() => ArcadeSessionUncheckedCreateWithoutRewardRedemptionInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ArcadeSessionCreateOrConnectWithoutRewardRedemptionInputObjectSchema), z.lazy(() => ArcadeSessionCreateOrConnectWithoutRewardRedemptionInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ArcadeSessionCreateManyRewardRedemptionInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema), z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ArcadeSessionCreateNestedManyWithoutRewardRedemptionInputObjectSchema: z.ZodType<Prisma.ArcadeSessionCreateNestedManyWithoutRewardRedemptionInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionCreateNestedManyWithoutRewardRedemptionInput>;
export const ArcadeSessionCreateNestedManyWithoutRewardRedemptionInputObjectZodSchema = makeSchema();
