import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActorIncludeObjectSchema as ActorIncludeObjectSchema } from './objects/ActorInclude.schema';
import { ActorOrderByWithRelationInputObjectSchema as ActorOrderByWithRelationInputObjectSchema } from './objects/ActorOrderByWithRelationInput.schema';
import { ActorWhereInputObjectSchema as ActorWhereInputObjectSchema } from './objects/ActorWhereInput.schema';
import { ActorWhereUniqueInputObjectSchema as ActorWhereUniqueInputObjectSchema } from './objects/ActorWhereUniqueInput.schema';
import { ActorScalarFieldEnumSchema } from './enums/ActorScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ActorFindManySelectSchema: z.ZodType<Prisma.ActorSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    label: z.boolean().optional(),
    type: z.boolean().optional(),
    note: z.boolean().optional(),
    source: z.boolean().optional(),
    metadata: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    entities: z.boolean().optional(),
    caches: z.boolean().optional(),
    geoDirections: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.ActorSelect>;

export const ActorFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    label: z.boolean().optional(),
    type: z.boolean().optional(),
    note: z.boolean().optional(),
    source: z.boolean().optional(),
    metadata: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    entities: z.boolean().optional(),
    caches: z.boolean().optional(),
    geoDirections: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const ActorFindManySchema: z.ZodType<Prisma.ActorFindManyArgs> = z.object({ select: ActorFindManySelectSchema.optional(), include: z.lazy(() => ActorIncludeObjectSchema.optional()), orderBy: z.union([ActorOrderByWithRelationInputObjectSchema, ActorOrderByWithRelationInputObjectSchema.array()]).optional(), where: ActorWhereInputObjectSchema.optional(), cursor: ActorWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ActorScalarFieldEnumSchema, ActorScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.ActorFindManyArgs>;

export const ActorFindManyZodSchema = z.object({ select: ActorFindManySelectSchema.optional(), include: z.lazy(() => ActorIncludeObjectSchema.optional()), orderBy: z.union([ActorOrderByWithRelationInputObjectSchema, ActorOrderByWithRelationInputObjectSchema.array()]).optional(), where: ActorWhereInputObjectSchema.optional(), cursor: ActorWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ActorScalarFieldEnumSchema, ActorScalarFieldEnumSchema.array()]).optional() }).strict();