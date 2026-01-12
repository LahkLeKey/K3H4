import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CulinaryMenuItemCreateWithoutUserInputObjectSchema as CulinaryMenuItemCreateWithoutUserInputObjectSchema } from './CulinaryMenuItemCreateWithoutUserInput.schema';
import { CulinaryMenuItemUncheckedCreateWithoutUserInputObjectSchema as CulinaryMenuItemUncheckedCreateWithoutUserInputObjectSchema } from './CulinaryMenuItemUncheckedCreateWithoutUserInput.schema';
import { CulinaryMenuItemCreateOrConnectWithoutUserInputObjectSchema as CulinaryMenuItemCreateOrConnectWithoutUserInputObjectSchema } from './CulinaryMenuItemCreateOrConnectWithoutUserInput.schema';
import { CulinaryMenuItemUpsertWithWhereUniqueWithoutUserInputObjectSchema as CulinaryMenuItemUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './CulinaryMenuItemUpsertWithWhereUniqueWithoutUserInput.schema';
import { CulinaryMenuItemCreateManyUserInputEnvelopeObjectSchema as CulinaryMenuItemCreateManyUserInputEnvelopeObjectSchema } from './CulinaryMenuItemCreateManyUserInputEnvelope.schema';
import { CulinaryMenuItemWhereUniqueInputObjectSchema as CulinaryMenuItemWhereUniqueInputObjectSchema } from './CulinaryMenuItemWhereUniqueInput.schema';
import { CulinaryMenuItemUpdateWithWhereUniqueWithoutUserInputObjectSchema as CulinaryMenuItemUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './CulinaryMenuItemUpdateWithWhereUniqueWithoutUserInput.schema';
import { CulinaryMenuItemUpdateManyWithWhereWithoutUserInputObjectSchema as CulinaryMenuItemUpdateManyWithWhereWithoutUserInputObjectSchema } from './CulinaryMenuItemUpdateManyWithWhereWithoutUserInput.schema';
import { CulinaryMenuItemScalarWhereInputObjectSchema as CulinaryMenuItemScalarWhereInputObjectSchema } from './CulinaryMenuItemScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CulinaryMenuItemCreateWithoutUserInputObjectSchema), z.lazy(() => CulinaryMenuItemCreateWithoutUserInputObjectSchema).array(), z.lazy(() => CulinaryMenuItemUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => CulinaryMenuItemUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CulinaryMenuItemCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => CulinaryMenuItemCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CulinaryMenuItemUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => CulinaryMenuItemUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CulinaryMenuItemCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CulinaryMenuItemWhereUniqueInputObjectSchema), z.lazy(() => CulinaryMenuItemWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CulinaryMenuItemWhereUniqueInputObjectSchema), z.lazy(() => CulinaryMenuItemWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CulinaryMenuItemWhereUniqueInputObjectSchema), z.lazy(() => CulinaryMenuItemWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CulinaryMenuItemWhereUniqueInputObjectSchema), z.lazy(() => CulinaryMenuItemWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CulinaryMenuItemUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => CulinaryMenuItemUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CulinaryMenuItemUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => CulinaryMenuItemUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CulinaryMenuItemScalarWhereInputObjectSchema), z.lazy(() => CulinaryMenuItemScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CulinaryMenuItemUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.CulinaryMenuItemUncheckedUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryMenuItemUncheckedUpdateManyWithoutUserNestedInput>;
export const CulinaryMenuItemUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
