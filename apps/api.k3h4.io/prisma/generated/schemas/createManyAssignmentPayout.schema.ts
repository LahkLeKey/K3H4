import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AssignmentPayoutCreateManyInputObjectSchema as AssignmentPayoutCreateManyInputObjectSchema } from './objects/AssignmentPayoutCreateManyInput.schema';

export const AssignmentPayoutCreateManySchema: z.ZodType<Prisma.AssignmentPayoutCreateManyArgs> = z.object({ data: z.union([ AssignmentPayoutCreateManyInputObjectSchema, z.array(AssignmentPayoutCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.AssignmentPayoutCreateManyArgs>;

export const AssignmentPayoutCreateManyZodSchema = z.object({ data: z.union([ AssignmentPayoutCreateManyInputObjectSchema, z.array(AssignmentPayoutCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();