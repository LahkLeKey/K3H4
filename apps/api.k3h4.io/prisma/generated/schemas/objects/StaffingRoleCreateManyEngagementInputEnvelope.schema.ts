import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingRoleCreateManyEngagementInputObjectSchema as StaffingRoleCreateManyEngagementInputObjectSchema } from './StaffingRoleCreateManyEngagementInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => StaffingRoleCreateManyEngagementInputObjectSchema), z.lazy(() => StaffingRoleCreateManyEngagementInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const StaffingRoleCreateManyEngagementInputEnvelopeObjectSchema: z.ZodType<Prisma.StaffingRoleCreateManyEngagementInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleCreateManyEngagementInputEnvelope>;
export const StaffingRoleCreateManyEngagementInputEnvelopeObjectZodSchema = makeSchema();
