import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureTaskWhereUniqueInputObjectSchema as AgricultureTaskWhereUniqueInputObjectSchema } from './AgricultureTaskWhereUniqueInput.schema';
import { AgricultureTaskUpdateWithoutUserInputObjectSchema as AgricultureTaskUpdateWithoutUserInputObjectSchema } from './AgricultureTaskUpdateWithoutUserInput.schema';
import { AgricultureTaskUncheckedUpdateWithoutUserInputObjectSchema as AgricultureTaskUncheckedUpdateWithoutUserInputObjectSchema } from './AgricultureTaskUncheckedUpdateWithoutUserInput.schema';
import { AgricultureTaskCreateWithoutUserInputObjectSchema as AgricultureTaskCreateWithoutUserInputObjectSchema } from './AgricultureTaskCreateWithoutUserInput.schema';
import { AgricultureTaskUncheckedCreateWithoutUserInputObjectSchema as AgricultureTaskUncheckedCreateWithoutUserInputObjectSchema } from './AgricultureTaskUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureTaskWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => AgricultureTaskUpdateWithoutUserInputObjectSchema), z.lazy(() => AgricultureTaskUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => AgricultureTaskCreateWithoutUserInputObjectSchema), z.lazy(() => AgricultureTaskUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const AgricultureTaskUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.AgricultureTaskUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureTaskUpsertWithWhereUniqueWithoutUserInput>;
export const AgricultureTaskUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
