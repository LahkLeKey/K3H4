import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProviderGrantCreateWithoutUserInputObjectSchema as ProviderGrantCreateWithoutUserInputObjectSchema } from './ProviderGrantCreateWithoutUserInput.schema';
import { ProviderGrantUncheckedCreateWithoutUserInputObjectSchema as ProviderGrantUncheckedCreateWithoutUserInputObjectSchema } from './ProviderGrantUncheckedCreateWithoutUserInput.schema';
import { ProviderGrantCreateOrConnectWithoutUserInputObjectSchema as ProviderGrantCreateOrConnectWithoutUserInputObjectSchema } from './ProviderGrantCreateOrConnectWithoutUserInput.schema';
import { ProviderGrantUpsertWithWhereUniqueWithoutUserInputObjectSchema as ProviderGrantUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './ProviderGrantUpsertWithWhereUniqueWithoutUserInput.schema';
import { ProviderGrantCreateManyUserInputEnvelopeObjectSchema as ProviderGrantCreateManyUserInputEnvelopeObjectSchema } from './ProviderGrantCreateManyUserInputEnvelope.schema';
import { ProviderGrantWhereUniqueInputObjectSchema as ProviderGrantWhereUniqueInputObjectSchema } from './ProviderGrantWhereUniqueInput.schema';
import { ProviderGrantUpdateWithWhereUniqueWithoutUserInputObjectSchema as ProviderGrantUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './ProviderGrantUpdateWithWhereUniqueWithoutUserInput.schema';
import { ProviderGrantUpdateManyWithWhereWithoutUserInputObjectSchema as ProviderGrantUpdateManyWithWhereWithoutUserInputObjectSchema } from './ProviderGrantUpdateManyWithWhereWithoutUserInput.schema';
import { ProviderGrantScalarWhereInputObjectSchema as ProviderGrantScalarWhereInputObjectSchema } from './ProviderGrantScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProviderGrantCreateWithoutUserInputObjectSchema), z.lazy(() => ProviderGrantCreateWithoutUserInputObjectSchema).array(), z.lazy(() => ProviderGrantUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => ProviderGrantUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ProviderGrantCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => ProviderGrantCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ProviderGrantUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => ProviderGrantUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ProviderGrantCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ProviderGrantWhereUniqueInputObjectSchema), z.lazy(() => ProviderGrantWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ProviderGrantWhereUniqueInputObjectSchema), z.lazy(() => ProviderGrantWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ProviderGrantWhereUniqueInputObjectSchema), z.lazy(() => ProviderGrantWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ProviderGrantWhereUniqueInputObjectSchema), z.lazy(() => ProviderGrantWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ProviderGrantUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => ProviderGrantUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ProviderGrantUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => ProviderGrantUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ProviderGrantScalarWhereInputObjectSchema), z.lazy(() => ProviderGrantScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ProviderGrantUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.ProviderGrantUncheckedUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ProviderGrantUncheckedUpdateManyWithoutUserNestedInput>;
export const ProviderGrantUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
