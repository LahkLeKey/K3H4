import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeRedemptionWhereInputObjectSchema as ArcadeRedemptionWhereInputObjectSchema } from './ArcadeRedemptionWhereInput.schema';
import { ArcadeRedemptionUpdateWithoutSessionsInputObjectSchema as ArcadeRedemptionUpdateWithoutSessionsInputObjectSchema } from './ArcadeRedemptionUpdateWithoutSessionsInput.schema';
import { ArcadeRedemptionUncheckedUpdateWithoutSessionsInputObjectSchema as ArcadeRedemptionUncheckedUpdateWithoutSessionsInputObjectSchema } from './ArcadeRedemptionUncheckedUpdateWithoutSessionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeRedemptionWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ArcadeRedemptionUpdateWithoutSessionsInputObjectSchema), z.lazy(() => ArcadeRedemptionUncheckedUpdateWithoutSessionsInputObjectSchema)])
}).strict();
export const ArcadeRedemptionUpdateToOneWithWhereWithoutSessionsInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionUpdateToOneWithWhereWithoutSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionUpdateToOneWithWhereWithoutSessionsInput>;
export const ArcadeRedemptionUpdateToOneWithWhereWithoutSessionsInputObjectZodSchema = makeSchema();
