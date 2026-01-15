import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingPlacementCreateManyPersonaInputObjectSchema as StaffingPlacementCreateManyPersonaInputObjectSchema } from './StaffingPlacementCreateManyPersonaInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => StaffingPlacementCreateManyPersonaInputObjectSchema), z.lazy(() => StaffingPlacementCreateManyPersonaInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const StaffingPlacementCreateManyPersonaInputEnvelopeObjectSchema: z.ZodType<Prisma.StaffingPlacementCreateManyPersonaInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementCreateManyPersonaInputEnvelope>;
export const StaffingPlacementCreateManyPersonaInputEnvelopeObjectZodSchema = makeSchema();
