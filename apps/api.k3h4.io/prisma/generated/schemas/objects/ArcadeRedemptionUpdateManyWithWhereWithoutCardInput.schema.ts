import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeRedemptionScalarWhereInputObjectSchema as ArcadeRedemptionScalarWhereInputObjectSchema } from './ArcadeRedemptionScalarWhereInput.schema';
import { ArcadeRedemptionUpdateManyMutationInputObjectSchema as ArcadeRedemptionUpdateManyMutationInputObjectSchema } from './ArcadeRedemptionUpdateManyMutationInput.schema';
import { ArcadeRedemptionUncheckedUpdateManyWithoutCardInputObjectSchema as ArcadeRedemptionUncheckedUpdateManyWithoutCardInputObjectSchema } from './ArcadeRedemptionUncheckedUpdateManyWithoutCardInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeRedemptionScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ArcadeRedemptionUpdateManyMutationInputObjectSchema), z.lazy(() => ArcadeRedemptionUncheckedUpdateManyWithoutCardInputObjectSchema)])
}).strict();
export const ArcadeRedemptionUpdateManyWithWhereWithoutCardInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionUpdateManyWithWhereWithoutCardInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionUpdateManyWithWhereWithoutCardInput>;
export const ArcadeRedemptionUpdateManyWithWhereWithoutCardInputObjectZodSchema = makeSchema();
