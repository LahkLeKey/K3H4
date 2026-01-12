import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosStoreScalarWhereInputObjectSchema as PosStoreScalarWhereInputObjectSchema } from './PosStoreScalarWhereInput.schema';
import { PosStoreUpdateManyMutationInputObjectSchema as PosStoreUpdateManyMutationInputObjectSchema } from './PosStoreUpdateManyMutationInput.schema';
import { PosStoreUncheckedUpdateManyWithoutUserInputObjectSchema as PosStoreUncheckedUpdateManyWithoutUserInputObjectSchema } from './PosStoreUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PosStoreScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => PosStoreUpdateManyMutationInputObjectSchema), z.lazy(() => PosStoreUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const PosStoreUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.PosStoreUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.PosStoreUpdateManyWithWhereWithoutUserInput>;
export const PosStoreUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
