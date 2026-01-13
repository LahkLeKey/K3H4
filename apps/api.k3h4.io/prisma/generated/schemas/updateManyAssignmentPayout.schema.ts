import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AssignmentPayoutUpdateManyMutationInputObjectSchema as AssignmentPayoutUpdateManyMutationInputObjectSchema } from './objects/AssignmentPayoutUpdateManyMutationInput.schema';
import { AssignmentPayoutWhereInputObjectSchema as AssignmentPayoutWhereInputObjectSchema } from './objects/AssignmentPayoutWhereInput.schema';

export const AssignmentPayoutUpdateManySchema: z.ZodType<Prisma.AssignmentPayoutUpdateManyArgs> = z.object({ data: AssignmentPayoutUpdateManyMutationInputObjectSchema, where: AssignmentPayoutWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AssignmentPayoutUpdateManyArgs>;

export const AssignmentPayoutUpdateManyZodSchema = z.object({ data: AssignmentPayoutUpdateManyMutationInputObjectSchema, where: AssignmentPayoutWhereInputObjectSchema.optional() }).strict();