import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureResourceCategoryWhereUniqueInputObjectSchema as AgricultureResourceCategoryWhereUniqueInputObjectSchema } from './AgricultureResourceCategoryWhereUniqueInput.schema';
import { AgricultureResourceCategoryCreateWithoutResourcesInputObjectSchema as AgricultureResourceCategoryCreateWithoutResourcesInputObjectSchema } from './AgricultureResourceCategoryCreateWithoutResourcesInput.schema';
import { AgricultureResourceCategoryUncheckedCreateWithoutResourcesInputObjectSchema as AgricultureResourceCategoryUncheckedCreateWithoutResourcesInputObjectSchema } from './AgricultureResourceCategoryUncheckedCreateWithoutResourcesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureResourceCategoryWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AgricultureResourceCategoryCreateWithoutResourcesInputObjectSchema), z.lazy(() => AgricultureResourceCategoryUncheckedCreateWithoutResourcesInputObjectSchema)])
}).strict();
export const AgricultureResourceCategoryCreateOrConnectWithoutResourcesInputObjectSchema: z.ZodType<Prisma.AgricultureResourceCategoryCreateOrConnectWithoutResourcesInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceCategoryCreateOrConnectWithoutResourcesInput>;
export const AgricultureResourceCategoryCreateOrConnectWithoutResourcesInputObjectZodSchema = makeSchema();
