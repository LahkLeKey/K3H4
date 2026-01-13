import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadePrizeWhereUniqueInputObjectSchema as ArcadePrizeWhereUniqueInputObjectSchema } from './ArcadePrizeWhereUniqueInput.schema';
import { ArcadePrizeUpdateWithoutUserInputObjectSchema as ArcadePrizeUpdateWithoutUserInputObjectSchema } from './ArcadePrizeUpdateWithoutUserInput.schema';
import { ArcadePrizeUncheckedUpdateWithoutUserInputObjectSchema as ArcadePrizeUncheckedUpdateWithoutUserInputObjectSchema } from './ArcadePrizeUncheckedUpdateWithoutUserInput.schema';
import { ArcadePrizeCreateWithoutUserInputObjectSchema as ArcadePrizeCreateWithoutUserInputObjectSchema } from './ArcadePrizeCreateWithoutUserInput.schema';
import { ArcadePrizeUncheckedCreateWithoutUserInputObjectSchema as ArcadePrizeUncheckedCreateWithoutUserInputObjectSchema } from './ArcadePrizeUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadePrizeWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ArcadePrizeUpdateWithoutUserInputObjectSchema), z.lazy(() => ArcadePrizeUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => ArcadePrizeCreateWithoutUserInputObjectSchema), z.lazy(() => ArcadePrizeUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const ArcadePrizeUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.ArcadePrizeUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadePrizeUpsertWithWhereUniqueWithoutUserInput>;
export const ArcadePrizeUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
