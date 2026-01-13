import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeCardWhereUniqueInputObjectSchema as ArcadeCardWhereUniqueInputObjectSchema } from './ArcadeCardWhereUniqueInput.schema';
import { ArcadeCardUpdateWithoutUserInputObjectSchema as ArcadeCardUpdateWithoutUserInputObjectSchema } from './ArcadeCardUpdateWithoutUserInput.schema';
import { ArcadeCardUncheckedUpdateWithoutUserInputObjectSchema as ArcadeCardUncheckedUpdateWithoutUserInputObjectSchema } from './ArcadeCardUncheckedUpdateWithoutUserInput.schema';
import { ArcadeCardCreateWithoutUserInputObjectSchema as ArcadeCardCreateWithoutUserInputObjectSchema } from './ArcadeCardCreateWithoutUserInput.schema';
import { ArcadeCardUncheckedCreateWithoutUserInputObjectSchema as ArcadeCardUncheckedCreateWithoutUserInputObjectSchema } from './ArcadeCardUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeCardWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ArcadeCardUpdateWithoutUserInputObjectSchema), z.lazy(() => ArcadeCardUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => ArcadeCardCreateWithoutUserInputObjectSchema), z.lazy(() => ArcadeCardUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const ArcadeCardUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.ArcadeCardUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardUpsertWithWhereUniqueWithoutUserInput>;
export const ArcadeCardUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
