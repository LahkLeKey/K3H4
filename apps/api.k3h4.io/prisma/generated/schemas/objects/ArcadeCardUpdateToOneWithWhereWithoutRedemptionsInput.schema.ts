import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeCardWhereInputObjectSchema as ArcadeCardWhereInputObjectSchema } from './ArcadeCardWhereInput.schema';
import { ArcadeCardUpdateWithoutRedemptionsInputObjectSchema as ArcadeCardUpdateWithoutRedemptionsInputObjectSchema } from './ArcadeCardUpdateWithoutRedemptionsInput.schema';
import { ArcadeCardUncheckedUpdateWithoutRedemptionsInputObjectSchema as ArcadeCardUncheckedUpdateWithoutRedemptionsInputObjectSchema } from './ArcadeCardUncheckedUpdateWithoutRedemptionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeCardWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ArcadeCardUpdateWithoutRedemptionsInputObjectSchema), z.lazy(() => ArcadeCardUncheckedUpdateWithoutRedemptionsInputObjectSchema)])
}).strict();
export const ArcadeCardUpdateToOneWithWhereWithoutRedemptionsInputObjectSchema: z.ZodType<Prisma.ArcadeCardUpdateToOneWithWhereWithoutRedemptionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardUpdateToOneWithWhereWithoutRedemptionsInput>;
export const ArcadeCardUpdateToOneWithWhereWithoutRedemptionsInputObjectZodSchema = makeSchema();
