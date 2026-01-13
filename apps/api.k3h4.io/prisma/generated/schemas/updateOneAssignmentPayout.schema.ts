import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AssignmentPayoutSelectObjectSchema as AssignmentPayoutSelectObjectSchema } from './objects/AssignmentPayoutSelect.schema';
import { AssignmentPayoutIncludeObjectSchema as AssignmentPayoutIncludeObjectSchema } from './objects/AssignmentPayoutInclude.schema';
import { AssignmentPayoutUpdateInputObjectSchema as AssignmentPayoutUpdateInputObjectSchema } from './objects/AssignmentPayoutUpdateInput.schema';
import { AssignmentPayoutUncheckedUpdateInputObjectSchema as AssignmentPayoutUncheckedUpdateInputObjectSchema } from './objects/AssignmentPayoutUncheckedUpdateInput.schema';
import { AssignmentPayoutWhereUniqueInputObjectSchema as AssignmentPayoutWhereUniqueInputObjectSchema } from './objects/AssignmentPayoutWhereUniqueInput.schema';

export const AssignmentPayoutUpdateOneSchema: z.ZodType<Prisma.AssignmentPayoutUpdateArgs> = z.object({ select: AssignmentPayoutSelectObjectSchema.optional(), include: AssignmentPayoutIncludeObjectSchema.optional(), data: z.union([AssignmentPayoutUpdateInputObjectSchema, AssignmentPayoutUncheckedUpdateInputObjectSchema]), where: AssignmentPayoutWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AssignmentPayoutUpdateArgs>;

export const AssignmentPayoutUpdateOneZodSchema = z.object({ select: AssignmentPayoutSelectObjectSchema.optional(), include: AssignmentPayoutIncludeObjectSchema.optional(), data: z.union([AssignmentPayoutUpdateInputObjectSchema, AssignmentPayoutUncheckedUpdateInputObjectSchema]), where: AssignmentPayoutWhereUniqueInputObjectSchema }).strict();