import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureResourceCategoryWhereInputObjectSchema as AgricultureResourceCategoryWhereInputObjectSchema } from './AgricultureResourceCategoryWhereInput.schema';
import { AgricultureResourceCategoryUpdateWithoutResourcesInputObjectSchema as AgricultureResourceCategoryUpdateWithoutResourcesInputObjectSchema } from './AgricultureResourceCategoryUpdateWithoutResourcesInput.schema';
import { AgricultureResourceCategoryUncheckedUpdateWithoutResourcesInputObjectSchema as AgricultureResourceCategoryUncheckedUpdateWithoutResourcesInputObjectSchema } from './AgricultureResourceCategoryUncheckedUpdateWithoutResourcesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureResourceCategoryWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => AgricultureResourceCategoryUpdateWithoutResourcesInputObjectSchema), z.lazy(() => AgricultureResourceCategoryUncheckedUpdateWithoutResourcesInputObjectSchema)])
}).strict();
export const AgricultureResourceCategoryUpdateToOneWithWhereWithoutResourcesInputObjectSchema: z.ZodType<Prisma.AgricultureResourceCategoryUpdateToOneWithWhereWithoutResourcesInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceCategoryUpdateToOneWithWhereWithoutResourcesInput>;
export const AgricultureResourceCategoryUpdateToOneWithWhereWithoutResourcesInputObjectZodSchema = makeSchema();
