import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureTaskWhereUniqueInputObjectSchema as AgricultureTaskWhereUniqueInputObjectSchema } from './AgricultureTaskWhereUniqueInput.schema';
import { AgricultureTaskUpdateWithoutUserInputObjectSchema as AgricultureTaskUpdateWithoutUserInputObjectSchema } from './AgricultureTaskUpdateWithoutUserInput.schema';
import { AgricultureTaskUncheckedUpdateWithoutUserInputObjectSchema as AgricultureTaskUncheckedUpdateWithoutUserInputObjectSchema } from './AgricultureTaskUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureTaskWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => AgricultureTaskUpdateWithoutUserInputObjectSchema), z.lazy(() => AgricultureTaskUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const AgricultureTaskUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.AgricultureTaskUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureTaskUpdateWithWhereUniqueWithoutUserInput>;
export const AgricultureTaskUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
