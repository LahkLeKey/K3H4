import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureResourceCategoryCreateWithoutResourcesInputObjectSchema as AgricultureResourceCategoryCreateWithoutResourcesInputObjectSchema } from './AgricultureResourceCategoryCreateWithoutResourcesInput.schema';
import { AgricultureResourceCategoryUncheckedCreateWithoutResourcesInputObjectSchema as AgricultureResourceCategoryUncheckedCreateWithoutResourcesInputObjectSchema } from './AgricultureResourceCategoryUncheckedCreateWithoutResourcesInput.schema';
import { AgricultureResourceCategoryCreateOrConnectWithoutResourcesInputObjectSchema as AgricultureResourceCategoryCreateOrConnectWithoutResourcesInputObjectSchema } from './AgricultureResourceCategoryCreateOrConnectWithoutResourcesInput.schema';
import { AgricultureResourceCategoryWhereUniqueInputObjectSchema as AgricultureResourceCategoryWhereUniqueInputObjectSchema } from './AgricultureResourceCategoryWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgricultureResourceCategoryCreateWithoutResourcesInputObjectSchema), z.lazy(() => AgricultureResourceCategoryUncheckedCreateWithoutResourcesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => AgricultureResourceCategoryCreateOrConnectWithoutResourcesInputObjectSchema).optional(),
  connect: z.lazy(() => AgricultureResourceCategoryWhereUniqueInputObjectSchema).optional()
}).strict();
export const AgricultureResourceCategoryCreateNestedOneWithoutResourcesInputObjectSchema: z.ZodType<Prisma.AgricultureResourceCategoryCreateNestedOneWithoutResourcesInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceCategoryCreateNestedOneWithoutResourcesInput>;
export const AgricultureResourceCategoryCreateNestedOneWithoutResourcesInputObjectZodSchema = makeSchema();
