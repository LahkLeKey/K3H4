import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosStoreWhereUniqueInputObjectSchema as PosStoreWhereUniqueInputObjectSchema } from './PosStoreWhereUniqueInput.schema';
import { PosStoreUpdateWithoutUserInputObjectSchema as PosStoreUpdateWithoutUserInputObjectSchema } from './PosStoreUpdateWithoutUserInput.schema';
import { PosStoreUncheckedUpdateWithoutUserInputObjectSchema as PosStoreUncheckedUpdateWithoutUserInputObjectSchema } from './PosStoreUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PosStoreWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => PosStoreUpdateWithoutUserInputObjectSchema), z.lazy(() => PosStoreUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const PosStoreUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.PosStoreUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.PosStoreUpdateWithWhereUniqueWithoutUserInput>;
export const PosStoreUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
