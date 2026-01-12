import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CulinaryMenuItemCreateWithoutUserInputObjectSchema as CulinaryMenuItemCreateWithoutUserInputObjectSchema } from './CulinaryMenuItemCreateWithoutUserInput.schema';
import { CulinaryMenuItemUncheckedCreateWithoutUserInputObjectSchema as CulinaryMenuItemUncheckedCreateWithoutUserInputObjectSchema } from './CulinaryMenuItemUncheckedCreateWithoutUserInput.schema';
import { CulinaryMenuItemCreateOrConnectWithoutUserInputObjectSchema as CulinaryMenuItemCreateOrConnectWithoutUserInputObjectSchema } from './CulinaryMenuItemCreateOrConnectWithoutUserInput.schema';
import { CulinaryMenuItemCreateManyUserInputEnvelopeObjectSchema as CulinaryMenuItemCreateManyUserInputEnvelopeObjectSchema } from './CulinaryMenuItemCreateManyUserInputEnvelope.schema';
import { CulinaryMenuItemWhereUniqueInputObjectSchema as CulinaryMenuItemWhereUniqueInputObjectSchema } from './CulinaryMenuItemWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CulinaryMenuItemCreateWithoutUserInputObjectSchema), z.lazy(() => CulinaryMenuItemCreateWithoutUserInputObjectSchema).array(), z.lazy(() => CulinaryMenuItemUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => CulinaryMenuItemUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CulinaryMenuItemCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => CulinaryMenuItemCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CulinaryMenuItemCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CulinaryMenuItemWhereUniqueInputObjectSchema), z.lazy(() => CulinaryMenuItemWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CulinaryMenuItemUncheckedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.CulinaryMenuItemUncheckedCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryMenuItemUncheckedCreateNestedManyWithoutUserInput>;
export const CulinaryMenuItemUncheckedCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
