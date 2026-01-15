import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingRoleCreateManyUserInputObjectSchema as StaffingRoleCreateManyUserInputObjectSchema } from './StaffingRoleCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => StaffingRoleCreateManyUserInputObjectSchema), z.lazy(() => StaffingRoleCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const StaffingRoleCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.StaffingRoleCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleCreateManyUserInputEnvelope>;
export const StaffingRoleCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
