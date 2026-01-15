import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingShiftCreateManyAssignedPersonaInputObjectSchema as StaffingShiftCreateManyAssignedPersonaInputObjectSchema } from './StaffingShiftCreateManyAssignedPersonaInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => StaffingShiftCreateManyAssignedPersonaInputObjectSchema), z.lazy(() => StaffingShiftCreateManyAssignedPersonaInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const StaffingShiftCreateManyAssignedPersonaInputEnvelopeObjectSchema: z.ZodType<Prisma.StaffingShiftCreateManyAssignedPersonaInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftCreateManyAssignedPersonaInputEnvelope>;
export const StaffingShiftCreateManyAssignedPersonaInputEnvelopeObjectZodSchema = makeSchema();
