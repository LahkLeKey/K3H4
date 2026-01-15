import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingPlacementCreateManyUserInputObjectSchema as StaffingPlacementCreateManyUserInputObjectSchema } from './StaffingPlacementCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => StaffingPlacementCreateManyUserInputObjectSchema), z.lazy(() => StaffingPlacementCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const StaffingPlacementCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.StaffingPlacementCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementCreateManyUserInputEnvelope>;
export const StaffingPlacementCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
