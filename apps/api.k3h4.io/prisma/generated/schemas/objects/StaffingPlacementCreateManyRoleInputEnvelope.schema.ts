import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingPlacementCreateManyRoleInputObjectSchema as StaffingPlacementCreateManyRoleInputObjectSchema } from './StaffingPlacementCreateManyRoleInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => StaffingPlacementCreateManyRoleInputObjectSchema), z.lazy(() => StaffingPlacementCreateManyRoleInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const StaffingPlacementCreateManyRoleInputEnvelopeObjectSchema: z.ZodType<Prisma.StaffingPlacementCreateManyRoleInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementCreateManyRoleInputEnvelope>;
export const StaffingPlacementCreateManyRoleInputEnvelopeObjectZodSchema = makeSchema();
