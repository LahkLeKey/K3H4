import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosStoreWhereUniqueInputObjectSchema as PosStoreWhereUniqueInputObjectSchema } from './PosStoreWhereUniqueInput.schema';
import { PosStoreUpdateWithoutUserInputObjectSchema as PosStoreUpdateWithoutUserInputObjectSchema } from './PosStoreUpdateWithoutUserInput.schema';
import { PosStoreUncheckedUpdateWithoutUserInputObjectSchema as PosStoreUncheckedUpdateWithoutUserInputObjectSchema } from './PosStoreUncheckedUpdateWithoutUserInput.schema';
import { PosStoreCreateWithoutUserInputObjectSchema as PosStoreCreateWithoutUserInputObjectSchema } from './PosStoreCreateWithoutUserInput.schema';
import { PosStoreUncheckedCreateWithoutUserInputObjectSchema as PosStoreUncheckedCreateWithoutUserInputObjectSchema } from './PosStoreUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PosStoreWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => PosStoreUpdateWithoutUserInputObjectSchema), z.lazy(() => PosStoreUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => PosStoreCreateWithoutUserInputObjectSchema), z.lazy(() => PosStoreUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const PosStoreUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.PosStoreUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.PosStoreUpsertWithWhereUniqueWithoutUserInput>;
export const PosStoreUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
