import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadePrizeWhereUniqueInputObjectSchema as ArcadePrizeWhereUniqueInputObjectSchema } from './ArcadePrizeWhereUniqueInput.schema';
import { ArcadePrizeUpdateWithoutUserInputObjectSchema as ArcadePrizeUpdateWithoutUserInputObjectSchema } from './ArcadePrizeUpdateWithoutUserInput.schema';
import { ArcadePrizeUncheckedUpdateWithoutUserInputObjectSchema as ArcadePrizeUncheckedUpdateWithoutUserInputObjectSchema } from './ArcadePrizeUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadePrizeWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ArcadePrizeUpdateWithoutUserInputObjectSchema), z.lazy(() => ArcadePrizeUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const ArcadePrizeUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.ArcadePrizeUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadePrizeUpdateWithWhereUniqueWithoutUserInput>;
export const ArcadePrizeUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
