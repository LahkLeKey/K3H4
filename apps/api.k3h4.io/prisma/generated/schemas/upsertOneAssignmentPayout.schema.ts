import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AssignmentPayoutSelectObjectSchema as AssignmentPayoutSelectObjectSchema } from './objects/AssignmentPayoutSelect.schema';
import { AssignmentPayoutIncludeObjectSchema as AssignmentPayoutIncludeObjectSchema } from './objects/AssignmentPayoutInclude.schema';
import { AssignmentPayoutWhereUniqueInputObjectSchema as AssignmentPayoutWhereUniqueInputObjectSchema } from './objects/AssignmentPayoutWhereUniqueInput.schema';
import { AssignmentPayoutCreateInputObjectSchema as AssignmentPayoutCreateInputObjectSchema } from './objects/AssignmentPayoutCreateInput.schema';
import { AssignmentPayoutUncheckedCreateInputObjectSchema as AssignmentPayoutUncheckedCreateInputObjectSchema } from './objects/AssignmentPayoutUncheckedCreateInput.schema';
import { AssignmentPayoutUpdateInputObjectSchema as AssignmentPayoutUpdateInputObjectSchema } from './objects/AssignmentPayoutUpdateInput.schema';
import { AssignmentPayoutUncheckedUpdateInputObjectSchema as AssignmentPayoutUncheckedUpdateInputObjectSchema } from './objects/AssignmentPayoutUncheckedUpdateInput.schema';

export const AssignmentPayoutUpsertOneSchema: z.ZodType<Prisma.AssignmentPayoutUpsertArgs> = z.object({ select: AssignmentPayoutSelectObjectSchema.optional(), include: AssignmentPayoutIncludeObjectSchema.optional(), where: AssignmentPayoutWhereUniqueInputObjectSchema, create: z.union([ AssignmentPayoutCreateInputObjectSchema, AssignmentPayoutUncheckedCreateInputObjectSchema ]), update: z.union([ AssignmentPayoutUpdateInputObjectSchema, AssignmentPayoutUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.AssignmentPayoutUpsertArgs>;

export const AssignmentPayoutUpsertOneZodSchema = z.object({ select: AssignmentPayoutSelectObjectSchema.optional(), include: AssignmentPayoutIncludeObjectSchema.optional(), where: AssignmentPayoutWhereUniqueInputObjectSchema, create: z.union([ AssignmentPayoutCreateInputObjectSchema, AssignmentPayoutUncheckedCreateInputObjectSchema ]), update: z.union([ AssignmentPayoutUpdateInputObjectSchema, AssignmentPayoutUncheckedUpdateInputObjectSchema ]) }).strict();