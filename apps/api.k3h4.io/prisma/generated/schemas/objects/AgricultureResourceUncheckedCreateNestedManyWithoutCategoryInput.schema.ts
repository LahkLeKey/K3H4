import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureResourceCreateWithoutCategoryInputObjectSchema as AgricultureResourceCreateWithoutCategoryInputObjectSchema } from './AgricultureResourceCreateWithoutCategoryInput.schema';
import { AgricultureResourceUncheckedCreateWithoutCategoryInputObjectSchema as AgricultureResourceUncheckedCreateWithoutCategoryInputObjectSchema } from './AgricultureResourceUncheckedCreateWithoutCategoryInput.schema';
import { AgricultureResourceCreateOrConnectWithoutCategoryInputObjectSchema as AgricultureResourceCreateOrConnectWithoutCategoryInputObjectSchema } from './AgricultureResourceCreateOrConnectWithoutCategoryInput.schema';
import { AgricultureResourceCreateManyCategoryInputEnvelopeObjectSchema as AgricultureResourceCreateManyCategoryInputEnvelopeObjectSchema } from './AgricultureResourceCreateManyCategoryInputEnvelope.schema';
import { AgricultureResourceWhereUniqueInputObjectSchema as AgricultureResourceWhereUniqueInputObjectSchema } from './AgricultureResourceWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgricultureResourceCreateWithoutCategoryInputObjectSchema), z.lazy(() => AgricultureResourceCreateWithoutCategoryInputObjectSchema).array(), z.lazy(() => AgricultureResourceUncheckedCreateWithoutCategoryInputObjectSchema), z.lazy(() => AgricultureResourceUncheckedCreateWithoutCategoryInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AgricultureResourceCreateOrConnectWithoutCategoryInputObjectSchema), z.lazy(() => AgricultureResourceCreateOrConnectWithoutCategoryInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AgricultureResourceCreateManyCategoryInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => AgricultureResourceWhereUniqueInputObjectSchema), z.lazy(() => AgricultureResourceWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const AgricultureResourceUncheckedCreateNestedManyWithoutCategoryInputObjectSchema: z.ZodType<Prisma.AgricultureResourceUncheckedCreateNestedManyWithoutCategoryInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceUncheckedCreateNestedManyWithoutCategoryInput>;
export const AgricultureResourceUncheckedCreateNestedManyWithoutCategoryInputObjectZodSchema = makeSchema();
