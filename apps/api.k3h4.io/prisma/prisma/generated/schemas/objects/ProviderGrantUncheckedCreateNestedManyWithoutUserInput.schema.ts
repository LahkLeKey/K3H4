import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProviderGrantCreateWithoutUserInputObjectSchema as ProviderGrantCreateWithoutUserInputObjectSchema } from './ProviderGrantCreateWithoutUserInput.schema';
import { ProviderGrantUncheckedCreateWithoutUserInputObjectSchema as ProviderGrantUncheckedCreateWithoutUserInputObjectSchema } from './ProviderGrantUncheckedCreateWithoutUserInput.schema';
import { ProviderGrantCreateOrConnectWithoutUserInputObjectSchema as ProviderGrantCreateOrConnectWithoutUserInputObjectSchema } from './ProviderGrantCreateOrConnectWithoutUserInput.schema';
import { ProviderGrantCreateManyUserInputEnvelopeObjectSchema as ProviderGrantCreateManyUserInputEnvelopeObjectSchema } from './ProviderGrantCreateManyUserInputEnvelope.schema';
import { ProviderGrantWhereUniqueInputObjectSchema as ProviderGrantWhereUniqueInputObjectSchema } from './ProviderGrantWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProviderGrantCreateWithoutUserInputObjectSchema), z.lazy(() => ProviderGrantCreateWithoutUserInputObjectSchema).array(), z.lazy(() => ProviderGrantUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => ProviderGrantUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ProviderGrantCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => ProviderGrantCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ProviderGrantCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ProviderGrantWhereUniqueInputObjectSchema), z.lazy(() => ProviderGrantWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ProviderGrantUncheckedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.ProviderGrantUncheckedCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ProviderGrantUncheckedCreateNestedManyWithoutUserInput>;
export const ProviderGrantUncheckedCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
