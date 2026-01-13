import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AssignmentPayoutSelectObjectSchema as AssignmentPayoutSelectObjectSchema } from './objects/AssignmentPayoutSelect.schema';
import { AssignmentPayoutCreateManyInputObjectSchema as AssignmentPayoutCreateManyInputObjectSchema } from './objects/AssignmentPayoutCreateManyInput.schema';

export const AssignmentPayoutCreateManyAndReturnSchema: z.ZodType<Prisma.AssignmentPayoutCreateManyAndReturnArgs> = z.object({ select: AssignmentPayoutSelectObjectSchema.optional(), data: z.union([ AssignmentPayoutCreateManyInputObjectSchema, z.array(AssignmentPayoutCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.AssignmentPayoutCreateManyAndReturnArgs>;

export const AssignmentPayoutCreateManyAndReturnZodSchema = z.object({ select: AssignmentPayoutSelectObjectSchema.optional(), data: z.union([ AssignmentPayoutCreateManyInputObjectSchema, z.array(AssignmentPayoutCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();