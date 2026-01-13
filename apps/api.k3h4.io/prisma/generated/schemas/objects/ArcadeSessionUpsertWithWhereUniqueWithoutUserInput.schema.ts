import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeSessionWhereUniqueInputObjectSchema as ArcadeSessionWhereUniqueInputObjectSchema } from './ArcadeSessionWhereUniqueInput.schema';
import { ArcadeSessionUpdateWithoutUserInputObjectSchema as ArcadeSessionUpdateWithoutUserInputObjectSchema } from './ArcadeSessionUpdateWithoutUserInput.schema';
import { ArcadeSessionUncheckedUpdateWithoutUserInputObjectSchema as ArcadeSessionUncheckedUpdateWithoutUserInputObjectSchema } from './ArcadeSessionUncheckedUpdateWithoutUserInput.schema';
import { ArcadeSessionCreateWithoutUserInputObjectSchema as ArcadeSessionCreateWithoutUserInputObjectSchema } from './ArcadeSessionCreateWithoutUserInput.schema';
import { ArcadeSessionUncheckedCreateWithoutUserInputObjectSchema as ArcadeSessionUncheckedCreateWithoutUserInputObjectSchema } from './ArcadeSessionUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ArcadeSessionUpdateWithoutUserInputObjectSchema), z.lazy(() => ArcadeSessionUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => ArcadeSessionCreateWithoutUserInputObjectSchema), z.lazy(() => ArcadeSessionUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const ArcadeSessionUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.ArcadeSessionUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionUpsertWithWhereUniqueWithoutUserInput>;
export const ArcadeSessionUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
