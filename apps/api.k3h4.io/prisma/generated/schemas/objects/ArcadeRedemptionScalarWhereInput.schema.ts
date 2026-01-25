import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { EnumLifecycleStatusFilterObjectSchema as EnumLifecycleStatusFilterObjectSchema } from './EnumLifecycleStatusFilter.schema';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const arcaderedemptionscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ArcadeRedemptionScalarWhereInputObjectSchema), z.lazy(() => ArcadeRedemptionScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ArcadeRedemptionScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ArcadeRedemptionScalarWhereInputObjectSchema), z.lazy(() => ArcadeRedemptionScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  cardId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  prizeId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  status: z.union([z.lazy(() => EnumLifecycleStatusFilterObjectSchema), LifecycleStatusSchema]).optional(),
  fulfilledAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const ArcadeRedemptionScalarWhereInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionScalarWhereInput> = arcaderedemptionscalarwhereinputSchema as unknown as z.ZodType<Prisma.ArcadeRedemptionScalarWhereInput>;
export const ArcadeRedemptionScalarWhereInputObjectZodSchema = arcaderedemptionscalarwhereinputSchema;
