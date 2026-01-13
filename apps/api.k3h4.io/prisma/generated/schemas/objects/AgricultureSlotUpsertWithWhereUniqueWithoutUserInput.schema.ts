import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureSlotWhereUniqueInputObjectSchema as AgricultureSlotWhereUniqueInputObjectSchema } from './AgricultureSlotWhereUniqueInput.schema';
import { AgricultureSlotUpdateWithoutUserInputObjectSchema as AgricultureSlotUpdateWithoutUserInputObjectSchema } from './AgricultureSlotUpdateWithoutUserInput.schema';
import { AgricultureSlotUncheckedUpdateWithoutUserInputObjectSchema as AgricultureSlotUncheckedUpdateWithoutUserInputObjectSchema } from './AgricultureSlotUncheckedUpdateWithoutUserInput.schema';
import { AgricultureSlotCreateWithoutUserInputObjectSchema as AgricultureSlotCreateWithoutUserInputObjectSchema } from './AgricultureSlotCreateWithoutUserInput.schema';
import { AgricultureSlotUncheckedCreateWithoutUserInputObjectSchema as AgricultureSlotUncheckedCreateWithoutUserInputObjectSchema } from './AgricultureSlotUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureSlotWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => AgricultureSlotUpdateWithoutUserInputObjectSchema), z.lazy(() => AgricultureSlotUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => AgricultureSlotCreateWithoutUserInputObjectSchema), z.lazy(() => AgricultureSlotUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const AgricultureSlotUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.AgricultureSlotUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureSlotUpsertWithWhereUniqueWithoutUserInput>;
export const AgricultureSlotUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
