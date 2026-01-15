import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StaffingEngagementSelectObjectSchema as StaffingEngagementSelectObjectSchema } from './objects/StaffingEngagementSelect.schema';
import { StaffingEngagementCreateManyInputObjectSchema as StaffingEngagementCreateManyInputObjectSchema } from './objects/StaffingEngagementCreateManyInput.schema';

export const StaffingEngagementCreateManyAndReturnSchema: z.ZodType<Prisma.StaffingEngagementCreateManyAndReturnArgs> = z.object({ select: StaffingEngagementSelectObjectSchema.optional(), data: z.union([ StaffingEngagementCreateManyInputObjectSchema, z.array(StaffingEngagementCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.StaffingEngagementCreateManyAndReturnArgs>;

export const StaffingEngagementCreateManyAndReturnZodSchema = z.object({ select: StaffingEngagementSelectObjectSchema.optional(), data: z.union([ StaffingEngagementCreateManyInputObjectSchema, z.array(StaffingEngagementCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();