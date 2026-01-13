import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryWhereUniqueInputObjectSchema as AgricultureInventoryWhereUniqueInputObjectSchema } from './AgricultureInventoryWhereUniqueInput.schema';
import { AgricultureInventoryUpdateWithoutUserInputObjectSchema as AgricultureInventoryUpdateWithoutUserInputObjectSchema } from './AgricultureInventoryUpdateWithoutUserInput.schema';
import { AgricultureInventoryUncheckedUpdateWithoutUserInputObjectSchema as AgricultureInventoryUncheckedUpdateWithoutUserInputObjectSchema } from './AgricultureInventoryUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureInventoryWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => AgricultureInventoryUpdateWithoutUserInputObjectSchema), z.lazy(() => AgricultureInventoryUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const AgricultureInventoryUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryUpdateWithWhereUniqueWithoutUserInput>;
export const AgricultureInventoryUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
