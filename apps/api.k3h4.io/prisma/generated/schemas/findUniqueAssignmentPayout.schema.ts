import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AssignmentPayoutSelectObjectSchema as AssignmentPayoutSelectObjectSchema } from './objects/AssignmentPayoutSelect.schema';
import { AssignmentPayoutIncludeObjectSchema as AssignmentPayoutIncludeObjectSchema } from './objects/AssignmentPayoutInclude.schema';
import { AssignmentPayoutWhereUniqueInputObjectSchema as AssignmentPayoutWhereUniqueInputObjectSchema } from './objects/AssignmentPayoutWhereUniqueInput.schema';

export const AssignmentPayoutFindUniqueSchema: z.ZodType<Prisma.AssignmentPayoutFindUniqueArgs> = z.object({ select: AssignmentPayoutSelectObjectSchema.optional(), include: AssignmentPayoutIncludeObjectSchema.optional(), where: AssignmentPayoutWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AssignmentPayoutFindUniqueArgs>;

export const AssignmentPayoutFindUniqueZodSchema = z.object({ select: AssignmentPayoutSelectObjectSchema.optional(), include: AssignmentPayoutIncludeObjectSchema.optional(), where: AssignmentPayoutWhereUniqueInputObjectSchema }).strict();