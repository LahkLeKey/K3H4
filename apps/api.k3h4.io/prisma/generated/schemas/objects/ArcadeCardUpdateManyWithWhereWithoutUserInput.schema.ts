import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeCardScalarWhereInputObjectSchema as ArcadeCardScalarWhereInputObjectSchema } from './ArcadeCardScalarWhereInput.schema';
import { ArcadeCardUpdateManyMutationInputObjectSchema as ArcadeCardUpdateManyMutationInputObjectSchema } from './ArcadeCardUpdateManyMutationInput.schema';
import { ArcadeCardUncheckedUpdateManyWithoutUserInputObjectSchema as ArcadeCardUncheckedUpdateManyWithoutUserInputObjectSchema } from './ArcadeCardUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeCardScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ArcadeCardUpdateManyMutationInputObjectSchema), z.lazy(() => ArcadeCardUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const ArcadeCardUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.ArcadeCardUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardUpdateManyWithWhereWithoutUserInput>;
export const ArcadeCardUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
