import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeTopUpScalarWhereInputObjectSchema as ArcadeTopUpScalarWhereInputObjectSchema } from './ArcadeTopUpScalarWhereInput.schema';
import { ArcadeTopUpUpdateManyMutationInputObjectSchema as ArcadeTopUpUpdateManyMutationInputObjectSchema } from './ArcadeTopUpUpdateManyMutationInput.schema';
import { ArcadeTopUpUncheckedUpdateManyWithoutUserInputObjectSchema as ArcadeTopUpUncheckedUpdateManyWithoutUserInputObjectSchema } from './ArcadeTopUpUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeTopUpScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ArcadeTopUpUpdateManyMutationInputObjectSchema), z.lazy(() => ArcadeTopUpUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const ArcadeTopUpUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.ArcadeTopUpUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeTopUpUpdateManyWithWhereWithoutUserInput>;
export const ArcadeTopUpUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
