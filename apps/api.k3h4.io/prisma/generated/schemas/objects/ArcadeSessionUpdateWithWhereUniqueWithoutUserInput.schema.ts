import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeSessionWhereUniqueInputObjectSchema as ArcadeSessionWhereUniqueInputObjectSchema } from './ArcadeSessionWhereUniqueInput.schema';
import { ArcadeSessionUpdateWithoutUserInputObjectSchema as ArcadeSessionUpdateWithoutUserInputObjectSchema } from './ArcadeSessionUpdateWithoutUserInput.schema';
import { ArcadeSessionUncheckedUpdateWithoutUserInputObjectSchema as ArcadeSessionUncheckedUpdateWithoutUserInputObjectSchema } from './ArcadeSessionUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ArcadeSessionUpdateWithoutUserInputObjectSchema), z.lazy(() => ArcadeSessionUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const ArcadeSessionUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.ArcadeSessionUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionUpdateWithWhereUniqueWithoutUserInput>;
export const ArcadeSessionUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
