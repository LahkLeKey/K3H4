import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeCardCreateWithoutUserInputObjectSchema as ArcadeCardCreateWithoutUserInputObjectSchema } from './ArcadeCardCreateWithoutUserInput.schema';
import { ArcadeCardUncheckedCreateWithoutUserInputObjectSchema as ArcadeCardUncheckedCreateWithoutUserInputObjectSchema } from './ArcadeCardUncheckedCreateWithoutUserInput.schema';
import { ArcadeCardCreateOrConnectWithoutUserInputObjectSchema as ArcadeCardCreateOrConnectWithoutUserInputObjectSchema } from './ArcadeCardCreateOrConnectWithoutUserInput.schema';
import { ArcadeCardCreateManyUserInputEnvelopeObjectSchema as ArcadeCardCreateManyUserInputEnvelopeObjectSchema } from './ArcadeCardCreateManyUserInputEnvelope.schema';
import { ArcadeCardWhereUniqueInputObjectSchema as ArcadeCardWhereUniqueInputObjectSchema } from './ArcadeCardWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ArcadeCardCreateWithoutUserInputObjectSchema), z.lazy(() => ArcadeCardCreateWithoutUserInputObjectSchema).array(), z.lazy(() => ArcadeCardUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => ArcadeCardUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ArcadeCardCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => ArcadeCardCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ArcadeCardCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ArcadeCardWhereUniqueInputObjectSchema), z.lazy(() => ArcadeCardWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ArcadeCardUncheckedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.ArcadeCardUncheckedCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardUncheckedCreateNestedManyWithoutUserInput>;
export const ArcadeCardUncheckedCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
