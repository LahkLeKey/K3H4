import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryWhereUniqueInputObjectSchema as AgricultureInventoryWhereUniqueInputObjectSchema } from './AgricultureInventoryWhereUniqueInput.schema';
import { AgricultureInventoryUpdateWithoutUserInputObjectSchema as AgricultureInventoryUpdateWithoutUserInputObjectSchema } from './AgricultureInventoryUpdateWithoutUserInput.schema';
import { AgricultureInventoryUncheckedUpdateWithoutUserInputObjectSchema as AgricultureInventoryUncheckedUpdateWithoutUserInputObjectSchema } from './AgricultureInventoryUncheckedUpdateWithoutUserInput.schema';
import { AgricultureInventoryCreateWithoutUserInputObjectSchema as AgricultureInventoryCreateWithoutUserInputObjectSchema } from './AgricultureInventoryCreateWithoutUserInput.schema';
import { AgricultureInventoryUncheckedCreateWithoutUserInputObjectSchema as AgricultureInventoryUncheckedCreateWithoutUserInputObjectSchema } from './AgricultureInventoryUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureInventoryWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => AgricultureInventoryUpdateWithoutUserInputObjectSchema), z.lazy(() => AgricultureInventoryUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => AgricultureInventoryCreateWithoutUserInputObjectSchema), z.lazy(() => AgricultureInventoryUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const AgricultureInventoryUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryUpsertWithWhereUniqueWithoutUserInput>;
export const AgricultureInventoryUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
