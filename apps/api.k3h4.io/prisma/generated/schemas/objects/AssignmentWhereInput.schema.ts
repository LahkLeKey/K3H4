import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { EnumLifecycleStatusFilterObjectSchema as EnumLifecycleStatusFilterObjectSchema } from './EnumLifecycleStatusFilter.schema';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { PersonaScalarRelationFilterObjectSchema as PersonaScalarRelationFilterObjectSchema } from './PersonaScalarRelationFilter.schema';
import { PersonaWhereInputObjectSchema as PersonaWhereInputObjectSchema } from './PersonaWhereInput.schema';
import { AssignmentTimecardListRelationFilterObjectSchema as AssignmentTimecardListRelationFilterObjectSchema } from './AssignmentTimecardListRelationFilter.schema';
import { AssignmentPayoutListRelationFilterObjectSchema as AssignmentPayoutListRelationFilterObjectSchema } from './AssignmentPayoutListRelationFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const assignmentwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => AssignmentWhereInputObjectSchema), z.lazy(() => AssignmentWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AssignmentWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AssignmentWhereInputObjectSchema), z.lazy(() => AssignmentWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  personaId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  title: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  hourlyRate: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'hourlyRate' must be a Decimal",
})]).optional(),
  status: z.union([z.lazy(() => EnumLifecycleStatusFilterObjectSchema), LifecycleStatusSchema]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  persona: z.union([z.lazy(() => PersonaScalarRelationFilterObjectSchema), z.lazy(() => PersonaWhereInputObjectSchema)]).optional(),
  timecards: z.lazy(() => AssignmentTimecardListRelationFilterObjectSchema).optional(),
  payouts: z.lazy(() => AssignmentPayoutListRelationFilterObjectSchema).optional()
}).strict();
export const AssignmentWhereInputObjectSchema: z.ZodType<Prisma.AssignmentWhereInput> = assignmentwhereinputSchema as unknown as z.ZodType<Prisma.AssignmentWhereInput>;
export const AssignmentWhereInputObjectZodSchema = assignmentwhereinputSchema;
