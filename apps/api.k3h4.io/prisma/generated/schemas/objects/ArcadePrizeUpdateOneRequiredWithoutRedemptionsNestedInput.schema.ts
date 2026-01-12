import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadePrizeCreateWithoutRedemptionsInputObjectSchema as ArcadePrizeCreateWithoutRedemptionsInputObjectSchema } from './ArcadePrizeCreateWithoutRedemptionsInput.schema';
import { ArcadePrizeUncheckedCreateWithoutRedemptionsInputObjectSchema as ArcadePrizeUncheckedCreateWithoutRedemptionsInputObjectSchema } from './ArcadePrizeUncheckedCreateWithoutRedemptionsInput.schema';
import { ArcadePrizeCreateOrConnectWithoutRedemptionsInputObjectSchema as ArcadePrizeCreateOrConnectWithoutRedemptionsInputObjectSchema } from './ArcadePrizeCreateOrConnectWithoutRedemptionsInput.schema';
import { ArcadePrizeUpsertWithoutRedemptionsInputObjectSchema as ArcadePrizeUpsertWithoutRedemptionsInputObjectSchema } from './ArcadePrizeUpsertWithoutRedemptionsInput.schema';
import { ArcadePrizeWhereUniqueInputObjectSchema as ArcadePrizeWhereUniqueInputObjectSchema } from './ArcadePrizeWhereUniqueInput.schema';
import { ArcadePrizeUpdateToOneWithWhereWithoutRedemptionsInputObjectSchema as ArcadePrizeUpdateToOneWithWhereWithoutRedemptionsInputObjectSchema } from './ArcadePrizeUpdateToOneWithWhereWithoutRedemptionsInput.schema';
import { ArcadePrizeUpdateWithoutRedemptionsInputObjectSchema as ArcadePrizeUpdateWithoutRedemptionsInputObjectSchema } from './ArcadePrizeUpdateWithoutRedemptionsInput.schema';
import { ArcadePrizeUncheckedUpdateWithoutRedemptionsInputObjectSchema as ArcadePrizeUncheckedUpdateWithoutRedemptionsInputObjectSchema } from './ArcadePrizeUncheckedUpdateWithoutRedemptionsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ArcadePrizeCreateWithoutRedemptionsInputObjectSchema), z.lazy(() => ArcadePrizeUncheckedCreateWithoutRedemptionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ArcadePrizeCreateOrConnectWithoutRedemptionsInputObjectSchema).optional(),
  upsert: z.lazy(() => ArcadePrizeUpsertWithoutRedemptionsInputObjectSchema).optional(),
  connect: z.lazy(() => ArcadePrizeWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ArcadePrizeUpdateToOneWithWhereWithoutRedemptionsInputObjectSchema), z.lazy(() => ArcadePrizeUpdateWithoutRedemptionsInputObjectSchema), z.lazy(() => ArcadePrizeUncheckedUpdateWithoutRedemptionsInputObjectSchema)]).optional()
}).strict();
export const ArcadePrizeUpdateOneRequiredWithoutRedemptionsNestedInputObjectSchema: z.ZodType<Prisma.ArcadePrizeUpdateOneRequiredWithoutRedemptionsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadePrizeUpdateOneRequiredWithoutRedemptionsNestedInput>;
export const ArcadePrizeUpdateOneRequiredWithoutRedemptionsNestedInputObjectZodSchema = makeSchema();
