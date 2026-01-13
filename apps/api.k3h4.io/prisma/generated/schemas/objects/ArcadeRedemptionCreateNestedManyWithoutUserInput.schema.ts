import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeRedemptionCreateWithoutUserInputObjectSchema as ArcadeRedemptionCreateWithoutUserInputObjectSchema } from './ArcadeRedemptionCreateWithoutUserInput.schema';
import { ArcadeRedemptionUncheckedCreateWithoutUserInputObjectSchema as ArcadeRedemptionUncheckedCreateWithoutUserInputObjectSchema } from './ArcadeRedemptionUncheckedCreateWithoutUserInput.schema';
import { ArcadeRedemptionCreateOrConnectWithoutUserInputObjectSchema as ArcadeRedemptionCreateOrConnectWithoutUserInputObjectSchema } from './ArcadeRedemptionCreateOrConnectWithoutUserInput.schema';
import { ArcadeRedemptionCreateManyUserInputEnvelopeObjectSchema as ArcadeRedemptionCreateManyUserInputEnvelopeObjectSchema } from './ArcadeRedemptionCreateManyUserInputEnvelope.schema';
import { ArcadeRedemptionWhereUniqueInputObjectSchema as ArcadeRedemptionWhereUniqueInputObjectSchema } from './ArcadeRedemptionWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ArcadeRedemptionCreateWithoutUserInputObjectSchema), z.lazy(() => ArcadeRedemptionCreateWithoutUserInputObjectSchema).array(), z.lazy(() => ArcadeRedemptionUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => ArcadeRedemptionUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ArcadeRedemptionCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => ArcadeRedemptionCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ArcadeRedemptionCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema), z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ArcadeRedemptionCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionCreateNestedManyWithoutUserInput>;
export const ArcadeRedemptionCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
