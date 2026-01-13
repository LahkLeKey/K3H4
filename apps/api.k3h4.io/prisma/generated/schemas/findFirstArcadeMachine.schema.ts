import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeMachineIncludeObjectSchema as ArcadeMachineIncludeObjectSchema } from './objects/ArcadeMachineInclude.schema';
import { ArcadeMachineOrderByWithRelationInputObjectSchema as ArcadeMachineOrderByWithRelationInputObjectSchema } from './objects/ArcadeMachineOrderByWithRelationInput.schema';
import { ArcadeMachineWhereInputObjectSchema as ArcadeMachineWhereInputObjectSchema } from './objects/ArcadeMachineWhereInput.schema';
import { ArcadeMachineWhereUniqueInputObjectSchema as ArcadeMachineWhereUniqueInputObjectSchema } from './objects/ArcadeMachineWhereUniqueInput.schema';
import { ArcadeMachineScalarFieldEnumSchema } from './enums/ArcadeMachineScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ArcadeMachineFindFirstSelectSchema: z.ZodType<Prisma.ArcadeMachineSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    name: z.boolean().optional(),
    gameTitle: z.boolean().optional(),
    status: z.boolean().optional(),
    location: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    sessions: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.ArcadeMachineSelect>;

export const ArcadeMachineFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    name: z.boolean().optional(),
    gameTitle: z.boolean().optional(),
    status: z.boolean().optional(),
    location: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    sessions: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const ArcadeMachineFindFirstSchema: z.ZodType<Prisma.ArcadeMachineFindFirstArgs> = z.object({ select: ArcadeMachineFindFirstSelectSchema.optional(), include: z.lazy(() => ArcadeMachineIncludeObjectSchema.optional()), orderBy: z.union([ArcadeMachineOrderByWithRelationInputObjectSchema, ArcadeMachineOrderByWithRelationInputObjectSchema.array()]).optional(), where: ArcadeMachineWhereInputObjectSchema.optional(), cursor: ArcadeMachineWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ArcadeMachineScalarFieldEnumSchema, ArcadeMachineScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.ArcadeMachineFindFirstArgs>;

export const ArcadeMachineFindFirstZodSchema = z.object({ select: ArcadeMachineFindFirstSelectSchema.optional(), include: z.lazy(() => ArcadeMachineIncludeObjectSchema.optional()), orderBy: z.union([ArcadeMachineOrderByWithRelationInputObjectSchema, ArcadeMachineOrderByWithRelationInputObjectSchema.array()]).optional(), where: ArcadeMachineWhereInputObjectSchema.optional(), cursor: ArcadeMachineWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ArcadeMachineScalarFieldEnumSchema, ArcadeMachineScalarFieldEnumSchema.array()]).optional() }).strict();