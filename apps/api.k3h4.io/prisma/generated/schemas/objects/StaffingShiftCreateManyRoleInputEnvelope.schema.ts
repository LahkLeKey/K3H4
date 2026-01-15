import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingShiftCreateManyRoleInputObjectSchema as StaffingShiftCreateManyRoleInputObjectSchema } from './StaffingShiftCreateManyRoleInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => StaffingShiftCreateManyRoleInputObjectSchema), z.lazy(() => StaffingShiftCreateManyRoleInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const StaffingShiftCreateManyRoleInputEnvelopeObjectSchema: z.ZodType<Prisma.StaffingShiftCreateManyRoleInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftCreateManyRoleInputEnvelope>;
export const StaffingShiftCreateManyRoleInputEnvelopeObjectZodSchema = makeSchema();
