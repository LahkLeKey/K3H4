import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeRedemptionWhereInputObjectSchema as ArcadeRedemptionWhereInputObjectSchema } from './ArcadeRedemptionWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => ArcadeRedemptionWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => ArcadeRedemptionWhereInputObjectSchema).optional().nullable()
}).strict();
export const ArcadeRedemptionNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.ArcadeRedemptionNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionNullableScalarRelationFilter>;
export const ArcadeRedemptionNullableScalarRelationFilterObjectZodSchema = makeSchema();
