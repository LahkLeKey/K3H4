import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeRedemptionScalarWhereInputObjectSchema as ArcadeRedemptionScalarWhereInputObjectSchema } from './ArcadeRedemptionScalarWhereInput.schema';
import { ArcadeRedemptionUpdateManyMutationInputObjectSchema as ArcadeRedemptionUpdateManyMutationInputObjectSchema } from './ArcadeRedemptionUpdateManyMutationInput.schema';
import { ArcadeRedemptionUncheckedUpdateManyWithoutPrizeInputObjectSchema as ArcadeRedemptionUncheckedUpdateManyWithoutPrizeInputObjectSchema } from './ArcadeRedemptionUncheckedUpdateManyWithoutPrizeInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeRedemptionScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ArcadeRedemptionUpdateManyMutationInputObjectSchema), z.lazy(() => ArcadeRedemptionUncheckedUpdateManyWithoutPrizeInputObjectSchema)])
}).strict();
export const ArcadeRedemptionUpdateManyWithWhereWithoutPrizeInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionUpdateManyWithWhereWithoutPrizeInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionUpdateManyWithWhereWithoutPrizeInput>;
export const ArcadeRedemptionUpdateManyWithWhereWithoutPrizeInputObjectZodSchema = makeSchema();
