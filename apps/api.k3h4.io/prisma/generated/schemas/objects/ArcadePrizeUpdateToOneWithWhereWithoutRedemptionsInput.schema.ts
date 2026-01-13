import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadePrizeWhereInputObjectSchema as ArcadePrizeWhereInputObjectSchema } from './ArcadePrizeWhereInput.schema';
import { ArcadePrizeUpdateWithoutRedemptionsInputObjectSchema as ArcadePrizeUpdateWithoutRedemptionsInputObjectSchema } from './ArcadePrizeUpdateWithoutRedemptionsInput.schema';
import { ArcadePrizeUncheckedUpdateWithoutRedemptionsInputObjectSchema as ArcadePrizeUncheckedUpdateWithoutRedemptionsInputObjectSchema } from './ArcadePrizeUncheckedUpdateWithoutRedemptionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadePrizeWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ArcadePrizeUpdateWithoutRedemptionsInputObjectSchema), z.lazy(() => ArcadePrizeUncheckedUpdateWithoutRedemptionsInputObjectSchema)])
}).strict();
export const ArcadePrizeUpdateToOneWithWhereWithoutRedemptionsInputObjectSchema: z.ZodType<Prisma.ArcadePrizeUpdateToOneWithWhereWithoutRedemptionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadePrizeUpdateToOneWithWhereWithoutRedemptionsInput>;
export const ArcadePrizeUpdateToOneWithWhereWithoutRedemptionsInputObjectZodSchema = makeSchema();
