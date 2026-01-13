import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureResourceCreateWithoutCategoryInputObjectSchema as AgricultureResourceCreateWithoutCategoryInputObjectSchema } from './AgricultureResourceCreateWithoutCategoryInput.schema';
import { AgricultureResourceUncheckedCreateWithoutCategoryInputObjectSchema as AgricultureResourceUncheckedCreateWithoutCategoryInputObjectSchema } from './AgricultureResourceUncheckedCreateWithoutCategoryInput.schema';
import { AgricultureResourceCreateOrConnectWithoutCategoryInputObjectSchema as AgricultureResourceCreateOrConnectWithoutCategoryInputObjectSchema } from './AgricultureResourceCreateOrConnectWithoutCategoryInput.schema';
import { AgricultureResourceUpsertWithWhereUniqueWithoutCategoryInputObjectSchema as AgricultureResourceUpsertWithWhereUniqueWithoutCategoryInputObjectSchema } from './AgricultureResourceUpsertWithWhereUniqueWithoutCategoryInput.schema';
import { AgricultureResourceCreateManyCategoryInputEnvelopeObjectSchema as AgricultureResourceCreateManyCategoryInputEnvelopeObjectSchema } from './AgricultureResourceCreateManyCategoryInputEnvelope.schema';
import { AgricultureResourceWhereUniqueInputObjectSchema as AgricultureResourceWhereUniqueInputObjectSchema } from './AgricultureResourceWhereUniqueInput.schema';
import { AgricultureResourceUpdateWithWhereUniqueWithoutCategoryInputObjectSchema as AgricultureResourceUpdateWithWhereUniqueWithoutCategoryInputObjectSchema } from './AgricultureResourceUpdateWithWhereUniqueWithoutCategoryInput.schema';
import { AgricultureResourceUpdateManyWithWhereWithoutCategoryInputObjectSchema as AgricultureResourceUpdateManyWithWhereWithoutCategoryInputObjectSchema } from './AgricultureResourceUpdateManyWithWhereWithoutCategoryInput.schema';
import { AgricultureResourceScalarWhereInputObjectSchema as AgricultureResourceScalarWhereInputObjectSchema } from './AgricultureResourceScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgricultureResourceCreateWithoutCategoryInputObjectSchema), z.lazy(() => AgricultureResourceCreateWithoutCategoryInputObjectSchema).array(), z.lazy(() => AgricultureResourceUncheckedCreateWithoutCategoryInputObjectSchema), z.lazy(() => AgricultureResourceUncheckedCreateWithoutCategoryInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AgricultureResourceCreateOrConnectWithoutCategoryInputObjectSchema), z.lazy(() => AgricultureResourceCreateOrConnectWithoutCategoryInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => AgricultureResourceUpsertWithWhereUniqueWithoutCategoryInputObjectSchema), z.lazy(() => AgricultureResourceUpsertWithWhereUniqueWithoutCategoryInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AgricultureResourceCreateManyCategoryInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => AgricultureResourceWhereUniqueInputObjectSchema), z.lazy(() => AgricultureResourceWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => AgricultureResourceWhereUniqueInputObjectSchema), z.lazy(() => AgricultureResourceWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => AgricultureResourceWhereUniqueInputObjectSchema), z.lazy(() => AgricultureResourceWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => AgricultureResourceWhereUniqueInputObjectSchema), z.lazy(() => AgricultureResourceWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => AgricultureResourceUpdateWithWhereUniqueWithoutCategoryInputObjectSchema), z.lazy(() => AgricultureResourceUpdateWithWhereUniqueWithoutCategoryInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => AgricultureResourceUpdateManyWithWhereWithoutCategoryInputObjectSchema), z.lazy(() => AgricultureResourceUpdateManyWithWhereWithoutCategoryInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => AgricultureResourceScalarWhereInputObjectSchema), z.lazy(() => AgricultureResourceScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const AgricultureResourceUncheckedUpdateManyWithoutCategoryNestedInputObjectSchema: z.ZodType<Prisma.AgricultureResourceUncheckedUpdateManyWithoutCategoryNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceUncheckedUpdateManyWithoutCategoryNestedInput>;
export const AgricultureResourceUncheckedUpdateManyWithoutCategoryNestedInputObjectZodSchema = makeSchema();
