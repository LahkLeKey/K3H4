import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingShiftCreateManyUserInputObjectSchema as StaffingShiftCreateManyUserInputObjectSchema } from './StaffingShiftCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => StaffingShiftCreateManyUserInputObjectSchema), z.lazy(() => StaffingShiftCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const StaffingShiftCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.StaffingShiftCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftCreateManyUserInputEnvelope>;
export const StaffingShiftCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
