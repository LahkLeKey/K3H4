import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadePrizeCreateWithoutUserInputObjectSchema as ArcadePrizeCreateWithoutUserInputObjectSchema } from './ArcadePrizeCreateWithoutUserInput.schema';
import { ArcadePrizeUncheckedCreateWithoutUserInputObjectSchema as ArcadePrizeUncheckedCreateWithoutUserInputObjectSchema } from './ArcadePrizeUncheckedCreateWithoutUserInput.schema';
import { ArcadePrizeCreateOrConnectWithoutUserInputObjectSchema as ArcadePrizeCreateOrConnectWithoutUserInputObjectSchema } from './ArcadePrizeCreateOrConnectWithoutUserInput.schema';
import { ArcadePrizeCreateManyUserInputEnvelopeObjectSchema as ArcadePrizeCreateManyUserInputEnvelopeObjectSchema } from './ArcadePrizeCreateManyUserInputEnvelope.schema';
import { ArcadePrizeWhereUniqueInputObjectSchema as ArcadePrizeWhereUniqueInputObjectSchema } from './ArcadePrizeWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ArcadePrizeCreateWithoutUserInputObjectSchema), z.lazy(() => ArcadePrizeCreateWithoutUserInputObjectSchema).array(), z.lazy(() => ArcadePrizeUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => ArcadePrizeUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ArcadePrizeCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => ArcadePrizeCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ArcadePrizeCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ArcadePrizeWhereUniqueInputObjectSchema), z.lazy(() => ArcadePrizeWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ArcadePrizeCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.ArcadePrizeCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadePrizeCreateNestedManyWithoutUserInput>;
export const ArcadePrizeCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
