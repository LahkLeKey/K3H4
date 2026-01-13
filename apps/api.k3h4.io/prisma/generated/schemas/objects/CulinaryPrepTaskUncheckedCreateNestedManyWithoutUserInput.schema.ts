import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CulinaryPrepTaskCreateWithoutUserInputObjectSchema as CulinaryPrepTaskCreateWithoutUserInputObjectSchema } from './CulinaryPrepTaskCreateWithoutUserInput.schema';
import { CulinaryPrepTaskUncheckedCreateWithoutUserInputObjectSchema as CulinaryPrepTaskUncheckedCreateWithoutUserInputObjectSchema } from './CulinaryPrepTaskUncheckedCreateWithoutUserInput.schema';
import { CulinaryPrepTaskCreateOrConnectWithoutUserInputObjectSchema as CulinaryPrepTaskCreateOrConnectWithoutUserInputObjectSchema } from './CulinaryPrepTaskCreateOrConnectWithoutUserInput.schema';
import { CulinaryPrepTaskCreateManyUserInputEnvelopeObjectSchema as CulinaryPrepTaskCreateManyUserInputEnvelopeObjectSchema } from './CulinaryPrepTaskCreateManyUserInputEnvelope.schema';
import { CulinaryPrepTaskWhereUniqueInputObjectSchema as CulinaryPrepTaskWhereUniqueInputObjectSchema } from './CulinaryPrepTaskWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CulinaryPrepTaskCreateWithoutUserInputObjectSchema), z.lazy(() => CulinaryPrepTaskCreateWithoutUserInputObjectSchema).array(), z.lazy(() => CulinaryPrepTaskUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => CulinaryPrepTaskUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CulinaryPrepTaskCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => CulinaryPrepTaskCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CulinaryPrepTaskCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CulinaryPrepTaskWhereUniqueInputObjectSchema), z.lazy(() => CulinaryPrepTaskWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CulinaryPrepTaskUncheckedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.CulinaryPrepTaskUncheckedCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryPrepTaskUncheckedCreateNestedManyWithoutUserInput>;
export const CulinaryPrepTaskUncheckedCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
