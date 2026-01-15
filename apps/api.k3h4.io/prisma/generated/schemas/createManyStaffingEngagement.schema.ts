import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingEngagementCreateManyInputObjectSchema as StaffingEngagementCreateManyInputObjectSchema } from './objects/StaffingEngagementCreateManyInput.schema';

export const StaffingEngagementCreateManySchema: z.ZodType<Prisma.StaffingEngagementCreateManyArgs> = z.object({ data: z.union([ StaffingEngagementCreateManyInputObjectSchema, z.array(StaffingEngagementCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.StaffingEngagementCreateManyArgs>;

export const StaffingEngagementCreateManyZodSchema = z.object({ data: z.union([ StaffingEngagementCreateManyInputObjectSchema, z.array(StaffingEngagementCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();