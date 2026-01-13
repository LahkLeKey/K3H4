import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AssignmentPayoutSelectObjectSchema as AssignmentPayoutSelectObjectSchema } from './objects/AssignmentPayoutSelect.schema';
import { AssignmentPayoutUpdateManyMutationInputObjectSchema as AssignmentPayoutUpdateManyMutationInputObjectSchema } from './objects/AssignmentPayoutUpdateManyMutationInput.schema';
import { AssignmentPayoutWhereInputObjectSchema as AssignmentPayoutWhereInputObjectSchema } from './objects/AssignmentPayoutWhereInput.schema';

export const AssignmentPayoutUpdateManyAndReturnSchema: z.ZodType<Prisma.AssignmentPayoutUpdateManyAndReturnArgs> = z.object({ select: AssignmentPayoutSelectObjectSchema.optional(), data: AssignmentPayoutUpdateManyMutationInputObjectSchema, where: AssignmentPayoutWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AssignmentPayoutUpdateManyAndReturnArgs>;

export const AssignmentPayoutUpdateManyAndReturnZodSchema = z.object({ select: AssignmentPayoutSelectObjectSchema.optional(), data: AssignmentPayoutUpdateManyMutationInputObjectSchema, where: AssignmentPayoutWhereInputObjectSchema.optional() }).strict();