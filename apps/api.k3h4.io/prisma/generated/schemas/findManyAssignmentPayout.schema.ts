import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AssignmentPayoutIncludeObjectSchema as AssignmentPayoutIncludeObjectSchema } from './objects/AssignmentPayoutInclude.schema';
import { AssignmentPayoutOrderByWithRelationInputObjectSchema as AssignmentPayoutOrderByWithRelationInputObjectSchema } from './objects/AssignmentPayoutOrderByWithRelationInput.schema';
import { AssignmentPayoutWhereInputObjectSchema as AssignmentPayoutWhereInputObjectSchema } from './objects/AssignmentPayoutWhereInput.schema';
import { AssignmentPayoutWhereUniqueInputObjectSchema as AssignmentPayoutWhereUniqueInputObjectSchema } from './objects/AssignmentPayoutWhereUniqueInput.schema';
import { AssignmentPayoutScalarFieldEnumSchema } from './enums/AssignmentPayoutScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const AssignmentPayoutFindManySelectSchema: z.ZodType<Prisma.AssignmentPayoutSelect> = z.object({
    id: z.boolean().optional(),
    assignmentId: z.boolean().optional(),
    assignment: z.boolean().optional(),
    personaId: z.boolean().optional(),
    persona: z.boolean().optional(),
    amount: z.boolean().optional(),
    note: z.boolean().optional(),
    invoiceUrl: z.boolean().optional(),
    status: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.AssignmentPayoutSelect>;

export const AssignmentPayoutFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    assignmentId: z.boolean().optional(),
    assignment: z.boolean().optional(),
    personaId: z.boolean().optional(),
    persona: z.boolean().optional(),
    amount: z.boolean().optional(),
    note: z.boolean().optional(),
    invoiceUrl: z.boolean().optional(),
    status: z.boolean().optional(),
    createdAt: z.boolean().optional()
  }).strict();

export const AssignmentPayoutFindManySchema: z.ZodType<Prisma.AssignmentPayoutFindManyArgs> = z.object({ select: AssignmentPayoutFindManySelectSchema.optional(), include: z.lazy(() => AssignmentPayoutIncludeObjectSchema.optional()), orderBy: z.union([AssignmentPayoutOrderByWithRelationInputObjectSchema, AssignmentPayoutOrderByWithRelationInputObjectSchema.array()]).optional(), where: AssignmentPayoutWhereInputObjectSchema.optional(), cursor: AssignmentPayoutWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([AssignmentPayoutScalarFieldEnumSchema, AssignmentPayoutScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.AssignmentPayoutFindManyArgs>;

export const AssignmentPayoutFindManyZodSchema = z.object({ select: AssignmentPayoutFindManySelectSchema.optional(), include: z.lazy(() => AssignmentPayoutIncludeObjectSchema.optional()), orderBy: z.union([AssignmentPayoutOrderByWithRelationInputObjectSchema, AssignmentPayoutOrderByWithRelationInputObjectSchema.array()]).optional(), where: AssignmentPayoutWhereInputObjectSchema.optional(), cursor: AssignmentPayoutWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([AssignmentPayoutScalarFieldEnumSchema, AssignmentPayoutScalarFieldEnumSchema.array()]).optional() }).strict();