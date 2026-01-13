import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureResourceCategoryCreateWithoutResourcesInputObjectSchema as AgricultureResourceCategoryCreateWithoutResourcesInputObjectSchema } from './AgricultureResourceCategoryCreateWithoutResourcesInput.schema';
import { AgricultureResourceCategoryUncheckedCreateWithoutResourcesInputObjectSchema as AgricultureResourceCategoryUncheckedCreateWithoutResourcesInputObjectSchema } from './AgricultureResourceCategoryUncheckedCreateWithoutResourcesInput.schema';
import { AgricultureResourceCategoryCreateOrConnectWithoutResourcesInputObjectSchema as AgricultureResourceCategoryCreateOrConnectWithoutResourcesInputObjectSchema } from './AgricultureResourceCategoryCreateOrConnectWithoutResourcesInput.schema';
import { AgricultureResourceCategoryUpsertWithoutResourcesInputObjectSchema as AgricultureResourceCategoryUpsertWithoutResourcesInputObjectSchema } from './AgricultureResourceCategoryUpsertWithoutResourcesInput.schema';
import { AgricultureResourceCategoryWhereUniqueInputObjectSchema as AgricultureResourceCategoryWhereUniqueInputObjectSchema } from './AgricultureResourceCategoryWhereUniqueInput.schema';
import { AgricultureResourceCategoryUpdateToOneWithWhereWithoutResourcesInputObjectSchema as AgricultureResourceCategoryUpdateToOneWithWhereWithoutResourcesInputObjectSchema } from './AgricultureResourceCategoryUpdateToOneWithWhereWithoutResourcesInput.schema';
import { AgricultureResourceCategoryUpdateWithoutResourcesInputObjectSchema as AgricultureResourceCategoryUpdateWithoutResourcesInputObjectSchema } from './AgricultureResourceCategoryUpdateWithoutResourcesInput.schema';
import { AgricultureResourceCategoryUncheckedUpdateWithoutResourcesInputObjectSchema as AgricultureResourceCategoryUncheckedUpdateWithoutResourcesInputObjectSchema } from './AgricultureResourceCategoryUncheckedUpdateWithoutResourcesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgricultureResourceCategoryCreateWithoutResourcesInputObjectSchema), z.lazy(() => AgricultureResourceCategoryUncheckedCreateWithoutResourcesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => AgricultureResourceCategoryCreateOrConnectWithoutResourcesInputObjectSchema).optional(),
  upsert: z.lazy(() => AgricultureResourceCategoryUpsertWithoutResourcesInputObjectSchema).optional(),
  connect: z.lazy(() => AgricultureResourceCategoryWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => AgricultureResourceCategoryUpdateToOneWithWhereWithoutResourcesInputObjectSchema), z.lazy(() => AgricultureResourceCategoryUpdateWithoutResourcesInputObjectSchema), z.lazy(() => AgricultureResourceCategoryUncheckedUpdateWithoutResourcesInputObjectSchema)]).optional()
}).strict();
export const AgricultureResourceCategoryUpdateOneRequiredWithoutResourcesNestedInputObjectSchema: z.ZodType<Prisma.AgricultureResourceCategoryUpdateOneRequiredWithoutResourcesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceCategoryUpdateOneRequiredWithoutResourcesNestedInput>;
export const AgricultureResourceCategoryUpdateOneRequiredWithoutResourcesNestedInputObjectZodSchema = makeSchema();
