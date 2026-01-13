import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { ArcadeCardNullableScalarRelationFilterObjectSchema as ArcadeCardNullableScalarRelationFilterObjectSchema } from './ArcadeCardNullableScalarRelationFilter.schema';
import { ArcadeCardWhereInputObjectSchema as ArcadeCardWhereInputObjectSchema } from './ArcadeCardWhereInput.schema';
import { ArcadePrizeScalarRelationFilterObjectSchema as ArcadePrizeScalarRelationFilterObjectSchema } from './ArcadePrizeScalarRelationFilter.schema';
import { ArcadePrizeWhereInputObjectSchema as ArcadePrizeWhereInputObjectSchema } from './ArcadePrizeWhereInput.schema';
import { ArcadeSessionListRelationFilterObjectSchema as ArcadeSessionListRelationFilterObjectSchema } from './ArcadeSessionListRelationFilter.schema'

const arcaderedemptionwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ArcadeRedemptionWhereInputObjectSchema), z.lazy(() => ArcadeRedemptionWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ArcadeRedemptionWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ArcadeRedemptionWhereInputObjectSchema), z.lazy(() => ArcadeRedemptionWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  cardId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  prizeId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  status: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  fulfilledAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  card: z.union([z.lazy(() => ArcadeCardNullableScalarRelationFilterObjectSchema), z.lazy(() => ArcadeCardWhereInputObjectSchema)]).optional(),
  prize: z.union([z.lazy(() => ArcadePrizeScalarRelationFilterObjectSchema), z.lazy(() => ArcadePrizeWhereInputObjectSchema)]).optional(),
  sessions: z.lazy(() => ArcadeSessionListRelationFilterObjectSchema).optional()
}).strict();
export const ArcadeRedemptionWhereInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionWhereInput> = arcaderedemptionwhereinputSchema as unknown as z.ZodType<Prisma.ArcadeRedemptionWhereInput>;
export const ArcadeRedemptionWhereInputObjectZodSchema = arcaderedemptionwhereinputSchema;
