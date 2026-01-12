import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeRedemptionWhereUniqueInputObjectSchema as ArcadeRedemptionWhereUniqueInputObjectSchema } from './ArcadeRedemptionWhereUniqueInput.schema';
import { ArcadeRedemptionUpdateWithoutCardInputObjectSchema as ArcadeRedemptionUpdateWithoutCardInputObjectSchema } from './ArcadeRedemptionUpdateWithoutCardInput.schema';
import { ArcadeRedemptionUncheckedUpdateWithoutCardInputObjectSchema as ArcadeRedemptionUncheckedUpdateWithoutCardInputObjectSchema } from './ArcadeRedemptionUncheckedUpdateWithoutCardInput.schema';
import { ArcadeRedemptionCreateWithoutCardInputObjectSchema as ArcadeRedemptionCreateWithoutCardInputObjectSchema } from './ArcadeRedemptionCreateWithoutCardInput.schema';
import { ArcadeRedemptionUncheckedCreateWithoutCardInputObjectSchema as ArcadeRedemptionUncheckedCreateWithoutCardInputObjectSchema } from './ArcadeRedemptionUncheckedCreateWithoutCardInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ArcadeRedemptionUpdateWithoutCardInputObjectSchema), z.lazy(() => ArcadeRedemptionUncheckedUpdateWithoutCardInputObjectSchema)]),
  create: z.union([z.lazy(() => ArcadeRedemptionCreateWithoutCardInputObjectSchema), z.lazy(() => ArcadeRedemptionUncheckedCreateWithoutCardInputObjectSchema)])
}).strict();
export const ArcadeRedemptionUpsertWithWhereUniqueWithoutCardInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionUpsertWithWhereUniqueWithoutCardInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionUpsertWithWhereUniqueWithoutCardInput>;
export const ArcadeRedemptionUpsertWithWhereUniqueWithoutCardInputObjectZodSchema = makeSchema();
