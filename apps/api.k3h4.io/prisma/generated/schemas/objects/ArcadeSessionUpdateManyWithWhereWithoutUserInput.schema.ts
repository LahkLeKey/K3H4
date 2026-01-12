import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeSessionScalarWhereInputObjectSchema as ArcadeSessionScalarWhereInputObjectSchema } from './ArcadeSessionScalarWhereInput.schema';
import { ArcadeSessionUpdateManyMutationInputObjectSchema as ArcadeSessionUpdateManyMutationInputObjectSchema } from './ArcadeSessionUpdateManyMutationInput.schema';
import { ArcadeSessionUncheckedUpdateManyWithoutUserInputObjectSchema as ArcadeSessionUncheckedUpdateManyWithoutUserInputObjectSchema } from './ArcadeSessionUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeSessionScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ArcadeSessionUpdateManyMutationInputObjectSchema), z.lazy(() => ArcadeSessionUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const ArcadeSessionUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.ArcadeSessionUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionUpdateManyWithWhereWithoutUserInput>;
export const ArcadeSessionUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
