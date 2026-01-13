import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureResourceWhereUniqueInputObjectSchema as AgricultureResourceWhereUniqueInputObjectSchema } from './AgricultureResourceWhereUniqueInput.schema';
import { AgricultureResourceUpdateWithoutCategoryInputObjectSchema as AgricultureResourceUpdateWithoutCategoryInputObjectSchema } from './AgricultureResourceUpdateWithoutCategoryInput.schema';
import { AgricultureResourceUncheckedUpdateWithoutCategoryInputObjectSchema as AgricultureResourceUncheckedUpdateWithoutCategoryInputObjectSchema } from './AgricultureResourceUncheckedUpdateWithoutCategoryInput.schema';
import { AgricultureResourceCreateWithoutCategoryInputObjectSchema as AgricultureResourceCreateWithoutCategoryInputObjectSchema } from './AgricultureResourceCreateWithoutCategoryInput.schema';
import { AgricultureResourceUncheckedCreateWithoutCategoryInputObjectSchema as AgricultureResourceUncheckedCreateWithoutCategoryInputObjectSchema } from './AgricultureResourceUncheckedCreateWithoutCategoryInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureResourceWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => AgricultureResourceUpdateWithoutCategoryInputObjectSchema), z.lazy(() => AgricultureResourceUncheckedUpdateWithoutCategoryInputObjectSchema)]),
  create: z.union([z.lazy(() => AgricultureResourceCreateWithoutCategoryInputObjectSchema), z.lazy(() => AgricultureResourceUncheckedCreateWithoutCategoryInputObjectSchema)])
}).strict();
export const AgricultureResourceUpsertWithWhereUniqueWithoutCategoryInputObjectSchema: z.ZodType<Prisma.AgricultureResourceUpsertWithWhereUniqueWithoutCategoryInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceUpsertWithWhereUniqueWithoutCategoryInput>;
export const AgricultureResourceUpsertWithWhereUniqueWithoutCategoryInputObjectZodSchema = makeSchema();
