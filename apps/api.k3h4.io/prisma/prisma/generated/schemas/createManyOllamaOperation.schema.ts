import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OllamaOperationCreateManyInputObjectSchema as OllamaOperationCreateManyInputObjectSchema } from './objects/OllamaOperationCreateManyInput.schema';

export const OllamaOperationCreateManySchema: z.ZodType<Prisma.OllamaOperationCreateManyArgs> = z.object({ data: z.union([ OllamaOperationCreateManyInputObjectSchema, z.array(OllamaOperationCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.OllamaOperationCreateManyArgs>;

export const OllamaOperationCreateManyZodSchema = z.object({ data: z.union([ OllamaOperationCreateManyInputObjectSchema, z.array(OllamaOperationCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();