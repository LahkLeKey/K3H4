import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadePrizeScalarWhereInputObjectSchema as ArcadePrizeScalarWhereInputObjectSchema } from './ArcadePrizeScalarWhereInput.schema';
import { ArcadePrizeUpdateManyMutationInputObjectSchema as ArcadePrizeUpdateManyMutationInputObjectSchema } from './ArcadePrizeUpdateManyMutationInput.schema';
import { ArcadePrizeUncheckedUpdateManyWithoutUserInputObjectSchema as ArcadePrizeUncheckedUpdateManyWithoutUserInputObjectSchema } from './ArcadePrizeUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadePrizeScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ArcadePrizeUpdateManyMutationInputObjectSchema), z.lazy(() => ArcadePrizeUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const ArcadePrizeUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.ArcadePrizeUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadePrizeUpdateManyWithWhereWithoutUserInput>;
export const ArcadePrizeUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
