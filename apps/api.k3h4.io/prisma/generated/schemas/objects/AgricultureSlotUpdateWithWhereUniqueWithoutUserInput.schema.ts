import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureSlotWhereUniqueInputObjectSchema as AgricultureSlotWhereUniqueInputObjectSchema } from './AgricultureSlotWhereUniqueInput.schema';
import { AgricultureSlotUpdateWithoutUserInputObjectSchema as AgricultureSlotUpdateWithoutUserInputObjectSchema } from './AgricultureSlotUpdateWithoutUserInput.schema';
import { AgricultureSlotUncheckedUpdateWithoutUserInputObjectSchema as AgricultureSlotUncheckedUpdateWithoutUserInputObjectSchema } from './AgricultureSlotUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureSlotWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => AgricultureSlotUpdateWithoutUserInputObjectSchema), z.lazy(() => AgricultureSlotUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const AgricultureSlotUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.AgricultureSlotUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureSlotUpdateWithWhereUniqueWithoutUserInput>;
export const AgricultureSlotUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
