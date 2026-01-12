import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeSessionCreateWithoutUserInputObjectSchema as ArcadeSessionCreateWithoutUserInputObjectSchema } from './ArcadeSessionCreateWithoutUserInput.schema';
import { ArcadeSessionUncheckedCreateWithoutUserInputObjectSchema as ArcadeSessionUncheckedCreateWithoutUserInputObjectSchema } from './ArcadeSessionUncheckedCreateWithoutUserInput.schema';
import { ArcadeSessionCreateOrConnectWithoutUserInputObjectSchema as ArcadeSessionCreateOrConnectWithoutUserInputObjectSchema } from './ArcadeSessionCreateOrConnectWithoutUserInput.schema';
import { ArcadeSessionCreateManyUserInputEnvelopeObjectSchema as ArcadeSessionCreateManyUserInputEnvelopeObjectSchema } from './ArcadeSessionCreateManyUserInputEnvelope.schema';
import { ArcadeSessionWhereUniqueInputObjectSchema as ArcadeSessionWhereUniqueInputObjectSchema } from './ArcadeSessionWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ArcadeSessionCreateWithoutUserInputObjectSchema), z.lazy(() => ArcadeSessionCreateWithoutUserInputObjectSchema).array(), z.lazy(() => ArcadeSessionUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => ArcadeSessionUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ArcadeSessionCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => ArcadeSessionCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ArcadeSessionCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema), z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ArcadeSessionUncheckedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.ArcadeSessionUncheckedCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionUncheckedCreateNestedManyWithoutUserInput>;
export const ArcadeSessionUncheckedCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
