import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadePrizeWhereUniqueInputObjectSchema as ArcadePrizeWhereUniqueInputObjectSchema } from './ArcadePrizeWhereUniqueInput.schema';
import { ArcadePrizeCreateWithoutUserInputObjectSchema as ArcadePrizeCreateWithoutUserInputObjectSchema } from './ArcadePrizeCreateWithoutUserInput.schema';
import { ArcadePrizeUncheckedCreateWithoutUserInputObjectSchema as ArcadePrizeUncheckedCreateWithoutUserInputObjectSchema } from './ArcadePrizeUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadePrizeWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ArcadePrizeCreateWithoutUserInputObjectSchema), z.lazy(() => ArcadePrizeUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const ArcadePrizeCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.ArcadePrizeCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadePrizeCreateOrConnectWithoutUserInput>;
export const ArcadePrizeCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
