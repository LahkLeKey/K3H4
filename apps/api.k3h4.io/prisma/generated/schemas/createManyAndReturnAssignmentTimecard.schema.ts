import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AssignmentTimecardSelectObjectSchema as AssignmentTimecardSelectObjectSchema } from './objects/AssignmentTimecardSelect.schema';
import { AssignmentTimecardCreateManyInputObjectSchema as AssignmentTimecardCreateManyInputObjectSchema } from './objects/AssignmentTimecardCreateManyInput.schema';

export const AssignmentTimecardCreateManyAndReturnSchema: z.ZodType<Prisma.AssignmentTimecardCreateManyAndReturnArgs> = z.object({ select: AssignmentTimecardSelectObjectSchema.optional(), data: z.union([ AssignmentTimecardCreateManyInputObjectSchema, z.array(AssignmentTimecardCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.AssignmentTimecardCreateManyAndReturnArgs>;

export const AssignmentTimecardCreateManyAndReturnZodSchema = z.object({ select: AssignmentTimecardSelectObjectSchema.optional(), data: z.union([ AssignmentTimecardCreateManyInputObjectSchema, z.array(AssignmentTimecardCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();