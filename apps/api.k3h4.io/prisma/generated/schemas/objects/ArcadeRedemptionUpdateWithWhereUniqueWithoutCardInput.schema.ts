import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeRedemptionWhereUniqueInputObjectSchema as ArcadeRedemptionWhereUniqueInputObjectSchema } from './ArcadeRedemptionWhereUniqueInput.schema';
import { ArcadeRedemptionUpdateWithoutCardInputObjectSchema as ArcadeRedemptionUpdateWithoutCardInputObjectSchema } from './ArcadeRedemptionUpdateWithoutCardInput.schema';
import { ArcadeRedemptionUncheckedUpdateWithoutCardInputObjectSchema as ArcadeRedemptionUncheckedUpdateWithoutCardInputObjectSchema } from './ArcadeRedemptionUncheckedUpdateWithoutCardInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ArcadeRedemptionUpdateWithoutCardInputObjectSchema), z.lazy(() => ArcadeRedemptionUncheckedUpdateWithoutCardInputObjectSchema)])
}).strict();
export const ArcadeRedemptionUpdateWithWhereUniqueWithoutCardInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionUpdateWithWhereUniqueWithoutCardInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionUpdateWithWhereUniqueWithoutCardInput>;
export const ArcadeRedemptionUpdateWithWhereUniqueWithoutCardInputObjectZodSchema = makeSchema();
