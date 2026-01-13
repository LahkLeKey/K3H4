import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureResourceCategoryUpdateWithoutResourcesInputObjectSchema as AgricultureResourceCategoryUpdateWithoutResourcesInputObjectSchema } from './AgricultureResourceCategoryUpdateWithoutResourcesInput.schema';
import { AgricultureResourceCategoryUncheckedUpdateWithoutResourcesInputObjectSchema as AgricultureResourceCategoryUncheckedUpdateWithoutResourcesInputObjectSchema } from './AgricultureResourceCategoryUncheckedUpdateWithoutResourcesInput.schema';
import { AgricultureResourceCategoryCreateWithoutResourcesInputObjectSchema as AgricultureResourceCategoryCreateWithoutResourcesInputObjectSchema } from './AgricultureResourceCategoryCreateWithoutResourcesInput.schema';
import { AgricultureResourceCategoryUncheckedCreateWithoutResourcesInputObjectSchema as AgricultureResourceCategoryUncheckedCreateWithoutResourcesInputObjectSchema } from './AgricultureResourceCategoryUncheckedCreateWithoutResourcesInput.schema';
import { AgricultureResourceCategoryWhereInputObjectSchema as AgricultureResourceCategoryWhereInputObjectSchema } from './AgricultureResourceCategoryWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => AgricultureResourceCategoryUpdateWithoutResourcesInputObjectSchema), z.lazy(() => AgricultureResourceCategoryUncheckedUpdateWithoutResourcesInputObjectSchema)]),
  create: z.union([z.lazy(() => AgricultureResourceCategoryCreateWithoutResourcesInputObjectSchema), z.lazy(() => AgricultureResourceCategoryUncheckedCreateWithoutResourcesInputObjectSchema)]),
  where: z.lazy(() => AgricultureResourceCategoryWhereInputObjectSchema).optional()
}).strict();
export const AgricultureResourceCategoryUpsertWithoutResourcesInputObjectSchema: z.ZodType<Prisma.AgricultureResourceCategoryUpsertWithoutResourcesInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceCategoryUpsertWithoutResourcesInput>;
export const AgricultureResourceCategoryUpsertWithoutResourcesInputObjectZodSchema = makeSchema();
