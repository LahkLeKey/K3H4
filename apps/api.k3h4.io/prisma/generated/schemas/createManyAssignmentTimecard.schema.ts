import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AssignmentTimecardCreateManyInputObjectSchema as AssignmentTimecardCreateManyInputObjectSchema } from './objects/AssignmentTimecardCreateManyInput.schema';

export const AssignmentTimecardCreateManySchema: z.ZodType<Prisma.AssignmentTimecardCreateManyArgs> = z.object({ data: z.union([ AssignmentTimecardCreateManyInputObjectSchema, z.array(AssignmentTimecardCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.AssignmentTimecardCreateManyArgs>;

export const AssignmentTimecardCreateManyZodSchema = z.object({ data: z.union([ AssignmentTimecardCreateManyInputObjectSchema, z.array(AssignmentTimecardCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();