import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingPlacementCreateManyEngagementInputObjectSchema as StaffingPlacementCreateManyEngagementInputObjectSchema } from './StaffingPlacementCreateManyEngagementInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => StaffingPlacementCreateManyEngagementInputObjectSchema), z.lazy(() => StaffingPlacementCreateManyEngagementInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const StaffingPlacementCreateManyEngagementInputEnvelopeObjectSchema: z.ZodType<Prisma.StaffingPlacementCreateManyEngagementInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementCreateManyEngagementInputEnvelope>;
export const StaffingPlacementCreateManyEngagementInputEnvelopeObjectZodSchema = makeSchema();
