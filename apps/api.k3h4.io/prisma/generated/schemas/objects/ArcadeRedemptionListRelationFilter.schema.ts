import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeRedemptionWhereInputObjectSchema as ArcadeRedemptionWhereInputObjectSchema } from './ArcadeRedemptionWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => ArcadeRedemptionWhereInputObjectSchema).optional(),
  some: z.lazy(() => ArcadeRedemptionWhereInputObjectSchema).optional(),
  none: z.lazy(() => ArcadeRedemptionWhereInputObjectSchema).optional()
}).strict();
export const ArcadeRedemptionListRelationFilterObjectSchema: z.ZodType<Prisma.ArcadeRedemptionListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionListRelationFilter>;
export const ArcadeRedemptionListRelationFilterObjectZodSchema = makeSchema();
