import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadePrizeUpdateWithoutRedemptionsInputObjectSchema as ArcadePrizeUpdateWithoutRedemptionsInputObjectSchema } from './ArcadePrizeUpdateWithoutRedemptionsInput.schema';
import { ArcadePrizeUncheckedUpdateWithoutRedemptionsInputObjectSchema as ArcadePrizeUncheckedUpdateWithoutRedemptionsInputObjectSchema } from './ArcadePrizeUncheckedUpdateWithoutRedemptionsInput.schema';
import { ArcadePrizeCreateWithoutRedemptionsInputObjectSchema as ArcadePrizeCreateWithoutRedemptionsInputObjectSchema } from './ArcadePrizeCreateWithoutRedemptionsInput.schema';
import { ArcadePrizeUncheckedCreateWithoutRedemptionsInputObjectSchema as ArcadePrizeUncheckedCreateWithoutRedemptionsInputObjectSchema } from './ArcadePrizeUncheckedCreateWithoutRedemptionsInput.schema';
import { ArcadePrizeWhereInputObjectSchema as ArcadePrizeWhereInputObjectSchema } from './ArcadePrizeWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ArcadePrizeUpdateWithoutRedemptionsInputObjectSchema), z.lazy(() => ArcadePrizeUncheckedUpdateWithoutRedemptionsInputObjectSchema)]),
  create: z.union([z.lazy(() => ArcadePrizeCreateWithoutRedemptionsInputObjectSchema), z.lazy(() => ArcadePrizeUncheckedCreateWithoutRedemptionsInputObjectSchema)]),
  where: z.lazy(() => ArcadePrizeWhereInputObjectSchema).optional()
}).strict();
export const ArcadePrizeUpsertWithoutRedemptionsInputObjectSchema: z.ZodType<Prisma.ArcadePrizeUpsertWithoutRedemptionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadePrizeUpsertWithoutRedemptionsInput>;
export const ArcadePrizeUpsertWithoutRedemptionsInputObjectZodSchema = makeSchema();
