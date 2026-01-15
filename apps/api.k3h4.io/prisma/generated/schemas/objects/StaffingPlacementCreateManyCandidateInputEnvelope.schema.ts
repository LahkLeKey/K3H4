import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingPlacementCreateManyCandidateInputObjectSchema as StaffingPlacementCreateManyCandidateInputObjectSchema } from './StaffingPlacementCreateManyCandidateInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => StaffingPlacementCreateManyCandidateInputObjectSchema), z.lazy(() => StaffingPlacementCreateManyCandidateInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const StaffingPlacementCreateManyCandidateInputEnvelopeObjectSchema: z.ZodType<Prisma.StaffingPlacementCreateManyCandidateInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementCreateManyCandidateInputEnvelope>;
export const StaffingPlacementCreateManyCandidateInputEnvelopeObjectZodSchema = makeSchema();
