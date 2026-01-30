import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerQueryCreateWithoutUserInputObjectSchema as MaptilerQueryCreateWithoutUserInputObjectSchema } from './MaptilerQueryCreateWithoutUserInput.schema';
import { MaptilerQueryUncheckedCreateWithoutUserInputObjectSchema as MaptilerQueryUncheckedCreateWithoutUserInputObjectSchema } from './MaptilerQueryUncheckedCreateWithoutUserInput.schema';
import { MaptilerQueryCreateOrConnectWithoutUserInputObjectSchema as MaptilerQueryCreateOrConnectWithoutUserInputObjectSchema } from './MaptilerQueryCreateOrConnectWithoutUserInput.schema';
import { MaptilerQueryCreateManyUserInputEnvelopeObjectSchema as MaptilerQueryCreateManyUserInputEnvelopeObjectSchema } from './MaptilerQueryCreateManyUserInputEnvelope.schema';
import { MaptilerQueryWhereUniqueInputObjectSchema as MaptilerQueryWhereUniqueInputObjectSchema } from './MaptilerQueryWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => MaptilerQueryCreateWithoutUserInputObjectSchema), z.lazy(() => MaptilerQueryCreateWithoutUserInputObjectSchema).array(), z.lazy(() => MaptilerQueryUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => MaptilerQueryUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => MaptilerQueryCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => MaptilerQueryCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => MaptilerQueryCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => MaptilerQueryWhereUniqueInputObjectSchema), z.lazy(() => MaptilerQueryWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const MaptilerQueryCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.MaptilerQueryCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerQueryCreateNestedManyWithoutUserInput>;
export const MaptilerQueryCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
