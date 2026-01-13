import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeCardWhereUniqueInputObjectSchema as ArcadeCardWhereUniqueInputObjectSchema } from './ArcadeCardWhereUniqueInput.schema';
import { ArcadeCardUpdateWithoutUserInputObjectSchema as ArcadeCardUpdateWithoutUserInputObjectSchema } from './ArcadeCardUpdateWithoutUserInput.schema';
import { ArcadeCardUncheckedUpdateWithoutUserInputObjectSchema as ArcadeCardUncheckedUpdateWithoutUserInputObjectSchema } from './ArcadeCardUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeCardWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ArcadeCardUpdateWithoutUserInputObjectSchema), z.lazy(() => ArcadeCardUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const ArcadeCardUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.ArcadeCardUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardUpdateWithWhereUniqueWithoutUserInput>;
export const ArcadeCardUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
