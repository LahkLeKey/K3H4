import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AssignmentPayoutWhereInputObjectSchema as AssignmentPayoutWhereInputObjectSchema } from './objects/AssignmentPayoutWhereInput.schema';

export const AssignmentPayoutDeleteManySchema: z.ZodType<Prisma.AssignmentPayoutDeleteManyArgs> = z.object({ where: AssignmentPayoutWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AssignmentPayoutDeleteManyArgs>;

export const AssignmentPayoutDeleteManyZodSchema = z.object({ where: AssignmentPayoutWhereInputObjectSchema.optional() }).strict();