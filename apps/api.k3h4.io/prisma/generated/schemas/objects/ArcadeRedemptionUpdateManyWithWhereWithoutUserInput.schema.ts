import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeRedemptionScalarWhereInputObjectSchema as ArcadeRedemptionScalarWhereInputObjectSchema } from './ArcadeRedemptionScalarWhereInput.schema';
import { ArcadeRedemptionUpdateManyMutationInputObjectSchema as ArcadeRedemptionUpdateManyMutationInputObjectSchema } from './ArcadeRedemptionUpdateManyMutationInput.schema';
import { ArcadeRedemptionUncheckedUpdateManyWithoutUserInputObjectSchema as ArcadeRedemptionUncheckedUpdateManyWithoutUserInputObjectSchema } from './ArcadeRedemptionUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeRedemptionScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ArcadeRedemptionUpdateManyMutationInputObjectSchema), z.lazy(() => ArcadeRedemptionUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const ArcadeRedemptionUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionUpdateManyWithWhereWithoutUserInput>;
export const ArcadeRedemptionUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
