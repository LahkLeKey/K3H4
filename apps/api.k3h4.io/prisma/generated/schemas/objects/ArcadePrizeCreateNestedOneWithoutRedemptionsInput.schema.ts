import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadePrizeCreateWithoutRedemptionsInputObjectSchema as ArcadePrizeCreateWithoutRedemptionsInputObjectSchema } from './ArcadePrizeCreateWithoutRedemptionsInput.schema';
import { ArcadePrizeUncheckedCreateWithoutRedemptionsInputObjectSchema as ArcadePrizeUncheckedCreateWithoutRedemptionsInputObjectSchema } from './ArcadePrizeUncheckedCreateWithoutRedemptionsInput.schema';
import { ArcadePrizeCreateOrConnectWithoutRedemptionsInputObjectSchema as ArcadePrizeCreateOrConnectWithoutRedemptionsInputObjectSchema } from './ArcadePrizeCreateOrConnectWithoutRedemptionsInput.schema';
import { ArcadePrizeWhereUniqueInputObjectSchema as ArcadePrizeWhereUniqueInputObjectSchema } from './ArcadePrizeWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ArcadePrizeCreateWithoutRedemptionsInputObjectSchema), z.lazy(() => ArcadePrizeUncheckedCreateWithoutRedemptionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ArcadePrizeCreateOrConnectWithoutRedemptionsInputObjectSchema).optional(),
  connect: z.lazy(() => ArcadePrizeWhereUniqueInputObjectSchema).optional()
}).strict();
export const ArcadePrizeCreateNestedOneWithoutRedemptionsInputObjectSchema: z.ZodType<Prisma.ArcadePrizeCreateNestedOneWithoutRedemptionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadePrizeCreateNestedOneWithoutRedemptionsInput>;
export const ArcadePrizeCreateNestedOneWithoutRedemptionsInputObjectZodSchema = makeSchema();
