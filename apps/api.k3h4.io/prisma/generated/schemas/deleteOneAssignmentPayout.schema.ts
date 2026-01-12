import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AssignmentPayoutSelectObjectSchema as AssignmentPayoutSelectObjectSchema } from './objects/AssignmentPayoutSelect.schema';
import { AssignmentPayoutIncludeObjectSchema as AssignmentPayoutIncludeObjectSchema } from './objects/AssignmentPayoutInclude.schema';
import { AssignmentPayoutWhereUniqueInputObjectSchema as AssignmentPayoutWhereUniqueInputObjectSchema } from './objects/AssignmentPayoutWhereUniqueInput.schema';

export const AssignmentPayoutDeleteOneSchema: z.ZodType<Prisma.AssignmentPayoutDeleteArgs> = z.object({ select: AssignmentPayoutSelectObjectSchema.optional(), include: AssignmentPayoutIncludeObjectSchema.optional(), where: AssignmentPayoutWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AssignmentPayoutDeleteArgs>;

export const AssignmentPayoutDeleteOneZodSchema = z.object({ select: AssignmentPayoutSelectObjectSchema.optional(), include: AssignmentPayoutIncludeObjectSchema.optional(), where: AssignmentPayoutWhereUniqueInputObjectSchema }).strict();