import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureResourceWhereUniqueInputObjectSchema as AgricultureResourceWhereUniqueInputObjectSchema } from './AgricultureResourceWhereUniqueInput.schema';
import { AgricultureResourceCreateWithoutCategoryInputObjectSchema as AgricultureResourceCreateWithoutCategoryInputObjectSchema } from './AgricultureResourceCreateWithoutCategoryInput.schema';
import { AgricultureResourceUncheckedCreateWithoutCategoryInputObjectSchema as AgricultureResourceUncheckedCreateWithoutCategoryInputObjectSchema } from './AgricultureResourceUncheckedCreateWithoutCategoryInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureResourceWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AgricultureResourceCreateWithoutCategoryInputObjectSchema), z.lazy(() => AgricultureResourceUncheckedCreateWithoutCategoryInputObjectSchema)])
}).strict();
export const AgricultureResourceCreateOrConnectWithoutCategoryInputObjectSchema: z.ZodType<Prisma.AgricultureResourceCreateOrConnectWithoutCategoryInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceCreateOrConnectWithoutCategoryInput>;
export const AgricultureResourceCreateOrConnectWithoutCategoryInputObjectZodSchema = makeSchema();
