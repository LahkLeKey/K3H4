import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeTopUpWhereUniqueInputObjectSchema as ArcadeTopUpWhereUniqueInputObjectSchema } from './ArcadeTopUpWhereUniqueInput.schema';
import { ArcadeTopUpUpdateWithoutUserInputObjectSchema as ArcadeTopUpUpdateWithoutUserInputObjectSchema } from './ArcadeTopUpUpdateWithoutUserInput.schema';
import { ArcadeTopUpUncheckedUpdateWithoutUserInputObjectSchema as ArcadeTopUpUncheckedUpdateWithoutUserInputObjectSchema } from './ArcadeTopUpUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeTopUpWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ArcadeTopUpUpdateWithoutUserInputObjectSchema), z.lazy(() => ArcadeTopUpUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const ArcadeTopUpUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.ArcadeTopUpUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeTopUpUpdateWithWhereUniqueWithoutUserInput>;
export const ArcadeTopUpUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
