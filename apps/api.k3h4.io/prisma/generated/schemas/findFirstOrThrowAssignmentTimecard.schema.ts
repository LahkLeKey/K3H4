import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AssignmentTimecardIncludeObjectSchema as AssignmentTimecardIncludeObjectSchema } from './objects/AssignmentTimecardInclude.schema';
import { AssignmentTimecardOrderByWithRelationInputObjectSchema as AssignmentTimecardOrderByWithRelationInputObjectSchema } from './objects/AssignmentTimecardOrderByWithRelationInput.schema';
import { AssignmentTimecardWhereInputObjectSchema as AssignmentTimecardWhereInputObjectSchema } from './objects/AssignmentTimecardWhereInput.schema';
import { AssignmentTimecardWhereUniqueInputObjectSchema as AssignmentTimecardWhereUniqueInputObjectSchema } from './objects/AssignmentTimecardWhereUniqueInput.schema';
import { AssignmentTimecardScalarFieldEnumSchema } from './enums/AssignmentTimecardScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const AssignmentTimecardFindFirstOrThrowSelectSchema: z.ZodType<Prisma.AssignmentTimecardSelect> = z.object({
    id: z.boolean().optional(),
    assignmentId: z.boolean().optional(),
    assignment: z.boolean().optional(),
    hours: z.boolean().optional(),
    amount: z.boolean().optional(),
    note: z.boolean().optional(),
    status: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.AssignmentTimecardSelect>;

export const AssignmentTimecardFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    assignmentId: z.boolean().optional(),
    assignment: z.boolean().optional(),
    hours: z.boolean().optional(),
    amount: z.boolean().optional(),
    note: z.boolean().optional(),
    status: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict();

export const AssignmentTimecardFindFirstOrThrowSchema: z.ZodType<Prisma.AssignmentTimecardFindFirstOrThrowArgs> = z.object({ select: AssignmentTimecardFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => AssignmentTimecardIncludeObjectSchema.optional()), orderBy: z.union([AssignmentTimecardOrderByWithRelationInputObjectSchema, AssignmentTimecardOrderByWithRelationInputObjectSchema.array()]).optional(), where: AssignmentTimecardWhereInputObjectSchema.optional(), cursor: AssignmentTimecardWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([AssignmentTimecardScalarFieldEnumSchema, AssignmentTimecardScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.AssignmentTimecardFindFirstOrThrowArgs>;

export const AssignmentTimecardFindFirstOrThrowZodSchema = z.object({ select: AssignmentTimecardFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => AssignmentTimecardIncludeObjectSchema.optional()), orderBy: z.union([AssignmentTimecardOrderByWithRelationInputObjectSchema, AssignmentTimecardOrderByWithRelationInputObjectSchema.array()]).optional(), where: AssignmentTimecardWhereInputObjectSchema.optional(), cursor: AssignmentTimecardWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([AssignmentTimecardScalarFieldEnumSchema, AssignmentTimecardScalarFieldEnumSchema.array()]).optional() }).strict();