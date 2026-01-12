import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeTopUpCreateWithoutUserInputObjectSchema as ArcadeTopUpCreateWithoutUserInputObjectSchema } from './ArcadeTopUpCreateWithoutUserInput.schema';
import { ArcadeTopUpUncheckedCreateWithoutUserInputObjectSchema as ArcadeTopUpUncheckedCreateWithoutUserInputObjectSchema } from './ArcadeTopUpUncheckedCreateWithoutUserInput.schema';
import { ArcadeTopUpCreateOrConnectWithoutUserInputObjectSchema as ArcadeTopUpCreateOrConnectWithoutUserInputObjectSchema } from './ArcadeTopUpCreateOrConnectWithoutUserInput.schema';
import { ArcadeTopUpCreateManyUserInputEnvelopeObjectSchema as ArcadeTopUpCreateManyUserInputEnvelopeObjectSchema } from './ArcadeTopUpCreateManyUserInputEnvelope.schema';
import { ArcadeTopUpWhereUniqueInputObjectSchema as ArcadeTopUpWhereUniqueInputObjectSchema } from './ArcadeTopUpWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ArcadeTopUpCreateWithoutUserInputObjectSchema), z.lazy(() => ArcadeTopUpCreateWithoutUserInputObjectSchema).array(), z.lazy(() => ArcadeTopUpUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => ArcadeTopUpUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ArcadeTopUpCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => ArcadeTopUpCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ArcadeTopUpCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ArcadeTopUpWhereUniqueInputObjectSchema), z.lazy(() => ArcadeTopUpWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ArcadeTopUpUncheckedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.ArcadeTopUpUncheckedCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeTopUpUncheckedCreateNestedManyWithoutUserInput>;
export const ArcadeTopUpUncheckedCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
