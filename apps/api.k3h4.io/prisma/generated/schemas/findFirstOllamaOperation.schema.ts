import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OllamaOperationIncludeObjectSchema as OllamaOperationIncludeObjectSchema } from './objects/OllamaOperationInclude.schema';
import { OllamaOperationOrderByWithRelationInputObjectSchema as OllamaOperationOrderByWithRelationInputObjectSchema } from './objects/OllamaOperationOrderByWithRelationInput.schema';
import { OllamaOperationWhereInputObjectSchema as OllamaOperationWhereInputObjectSchema } from './objects/OllamaOperationWhereInput.schema';
import { OllamaOperationWhereUniqueInputObjectSchema as OllamaOperationWhereUniqueInputObjectSchema } from './objects/OllamaOperationWhereUniqueInput.schema';
import { OllamaOperationScalarFieldEnumSchema } from './enums/OllamaOperationScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const OllamaOperationFindFirstSelectSchema: z.ZodType<Prisma.OllamaOperationSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    source: z.boolean().optional(),
    sessionId: z.boolean().optional(),
    session: z.boolean().optional(),
    model: z.boolean().optional(),
    temperature: z.boolean().optional(),
    systemPrompt: z.boolean().optional(),
    requestBody: z.boolean().optional(),
    responseBody: z.boolean().optional(),
    statusCode: z.boolean().optional(),
    errorMessage: z.boolean().optional(),
    metadata: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.OllamaOperationSelect>;

export const OllamaOperationFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional(),
    source: z.boolean().optional(),
    sessionId: z.boolean().optional(),
    session: z.boolean().optional(),
    model: z.boolean().optional(),
    temperature: z.boolean().optional(),
    systemPrompt: z.boolean().optional(),
    requestBody: z.boolean().optional(),
    responseBody: z.boolean().optional(),
    statusCode: z.boolean().optional(),
    errorMessage: z.boolean().optional(),
    metadata: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const OllamaOperationFindFirstSchema: z.ZodType<Prisma.OllamaOperationFindFirstArgs> = z.object({ select: OllamaOperationFindFirstSelectSchema.optional(), include: z.lazy(() => OllamaOperationIncludeObjectSchema.optional()), orderBy: z.union([OllamaOperationOrderByWithRelationInputObjectSchema, OllamaOperationOrderByWithRelationInputObjectSchema.array()]).optional(), where: OllamaOperationWhereInputObjectSchema.optional(), cursor: OllamaOperationWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([OllamaOperationScalarFieldEnumSchema, OllamaOperationScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.OllamaOperationFindFirstArgs>;

export const OllamaOperationFindFirstZodSchema = z.object({ select: OllamaOperationFindFirstSelectSchema.optional(), include: z.lazy(() => OllamaOperationIncludeObjectSchema.optional()), orderBy: z.union([OllamaOperationOrderByWithRelationInputObjectSchema, OllamaOperationOrderByWithRelationInputObjectSchema.array()]).optional(), where: OllamaOperationWhereInputObjectSchema.optional(), cursor: OllamaOperationWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([OllamaOperationScalarFieldEnumSchema, OllamaOperationScalarFieldEnumSchema.array()]).optional() }).strict();