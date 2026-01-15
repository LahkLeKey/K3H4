import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingEngagementCreateManyUserInputObjectSchema as StaffingEngagementCreateManyUserInputObjectSchema } from './StaffingEngagementCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => StaffingEngagementCreateManyUserInputObjectSchema), z.lazy(() => StaffingEngagementCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const StaffingEngagementCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.StaffingEngagementCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.StaffingEngagementCreateManyUserInputEnvelope>;
export const StaffingEngagementCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
