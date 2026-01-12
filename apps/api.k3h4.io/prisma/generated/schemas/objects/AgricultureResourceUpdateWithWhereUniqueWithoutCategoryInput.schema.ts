import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureResourceWhereUniqueInputObjectSchema as AgricultureResourceWhereUniqueInputObjectSchema } from './AgricultureResourceWhereUniqueInput.schema';
import { AgricultureResourceUpdateWithoutCategoryInputObjectSchema as AgricultureResourceUpdateWithoutCategoryInputObjectSchema } from './AgricultureResourceUpdateWithoutCategoryInput.schema';
import { AgricultureResourceUncheckedUpdateWithoutCategoryInputObjectSchema as AgricultureResourceUncheckedUpdateWithoutCategoryInputObjectSchema } from './AgricultureResourceUncheckedUpdateWithoutCategoryInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureResourceWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => AgricultureResourceUpdateWithoutCategoryInputObjectSchema), z.lazy(() => AgricultureResourceUncheckedUpdateWithoutCategoryInputObjectSchema)])
}).strict();
export const AgricultureResourceUpdateWithWhereUniqueWithoutCategoryInputObjectSchema: z.ZodType<Prisma.AgricultureResourceUpdateWithWhereUniqueWithoutCategoryInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceUpdateWithWhereUniqueWithoutCategoryInput>;
export const AgricultureResourceUpdateWithWhereUniqueWithoutCategoryInputObjectZodSchema = makeSchema();
