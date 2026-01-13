import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureResourceScalarWhereInputObjectSchema as AgricultureResourceScalarWhereInputObjectSchema } from './AgricultureResourceScalarWhereInput.schema';
import { AgricultureResourceUpdateManyMutationInputObjectSchema as AgricultureResourceUpdateManyMutationInputObjectSchema } from './AgricultureResourceUpdateManyMutationInput.schema';
import { AgricultureResourceUncheckedUpdateManyWithoutCategoryInputObjectSchema as AgricultureResourceUncheckedUpdateManyWithoutCategoryInputObjectSchema } from './AgricultureResourceUncheckedUpdateManyWithoutCategoryInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureResourceScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => AgricultureResourceUpdateManyMutationInputObjectSchema), z.lazy(() => AgricultureResourceUncheckedUpdateManyWithoutCategoryInputObjectSchema)])
}).strict();
export const AgricultureResourceUpdateManyWithWhereWithoutCategoryInputObjectSchema: z.ZodType<Prisma.AgricultureResourceUpdateManyWithWhereWithoutCategoryInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceUpdateManyWithWhereWithoutCategoryInput>;
export const AgricultureResourceUpdateManyWithWhereWithoutCategoryInputObjectZodSchema = makeSchema();
