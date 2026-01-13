import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AssignmentPayoutSelectObjectSchema as AssignmentPayoutSelectObjectSchema } from './objects/AssignmentPayoutSelect.schema';
import { AssignmentPayoutIncludeObjectSchema as AssignmentPayoutIncludeObjectSchema } from './objects/AssignmentPayoutInclude.schema';
import { AssignmentPayoutCreateInputObjectSchema as AssignmentPayoutCreateInputObjectSchema } from './objects/AssignmentPayoutCreateInput.schema';
import { AssignmentPayoutUncheckedCreateInputObjectSchema as AssignmentPayoutUncheckedCreateInputObjectSchema } from './objects/AssignmentPayoutUncheckedCreateInput.schema';

export const AssignmentPayoutCreateOneSchema: z.ZodType<Prisma.AssignmentPayoutCreateArgs> = z.object({ select: AssignmentPayoutSelectObjectSchema.optional(), include: AssignmentPayoutIncludeObjectSchema.optional(), data: z.union([AssignmentPayoutCreateInputObjectSchema, AssignmentPayoutUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.AssignmentPayoutCreateArgs>;

export const AssignmentPayoutCreateOneZodSchema = z.object({ select: AssignmentPayoutSelectObjectSchema.optional(), include: AssignmentPayoutIncludeObjectSchema.optional(), data: z.union([AssignmentPayoutCreateInputObjectSchema, AssignmentPayoutUncheckedCreateInputObjectSchema]) }).strict();