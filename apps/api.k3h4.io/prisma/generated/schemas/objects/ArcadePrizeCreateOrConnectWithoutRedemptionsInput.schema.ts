import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadePrizeWhereUniqueInputObjectSchema as ArcadePrizeWhereUniqueInputObjectSchema } from './ArcadePrizeWhereUniqueInput.schema';
import { ArcadePrizeCreateWithoutRedemptionsInputObjectSchema as ArcadePrizeCreateWithoutRedemptionsInputObjectSchema } from './ArcadePrizeCreateWithoutRedemptionsInput.schema';
import { ArcadePrizeUncheckedCreateWithoutRedemptionsInputObjectSchema as ArcadePrizeUncheckedCreateWithoutRedemptionsInputObjectSchema } from './ArcadePrizeUncheckedCreateWithoutRedemptionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadePrizeWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ArcadePrizeCreateWithoutRedemptionsInputObjectSchema), z.lazy(() => ArcadePrizeUncheckedCreateWithoutRedemptionsInputObjectSchema)])
}).strict();
export const ArcadePrizeCreateOrConnectWithoutRedemptionsInputObjectSchema: z.ZodType<Prisma.ArcadePrizeCreateOrConnectWithoutRedemptionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadePrizeCreateOrConnectWithoutRedemptionsInput>;
export const ArcadePrizeCreateOrConnectWithoutRedemptionsInputObjectZodSchema = makeSchema();
