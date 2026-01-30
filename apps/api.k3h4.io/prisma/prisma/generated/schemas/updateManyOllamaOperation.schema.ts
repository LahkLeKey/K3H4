import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OllamaOperationUpdateManyMutationInputObjectSchema as OllamaOperationUpdateManyMutationInputObjectSchema } from './objects/OllamaOperationUpdateManyMutationInput.schema';
import { OllamaOperationWhereInputObjectSchema as OllamaOperationWhereInputObjectSchema } from './objects/OllamaOperationWhereInput.schema';

export const OllamaOperationUpdateManySchema: z.ZodType<Prisma.OllamaOperationUpdateManyArgs> = z.object({ data: OllamaOperationUpdateManyMutationInputObjectSchema, where: OllamaOperationWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.OllamaOperationUpdateManyArgs>;

export const OllamaOperationUpdateManyZodSchema = z.object({ data: OllamaOperationUpdateManyMutationInputObjectSchema, where: OllamaOperationWhereInputObjectSchema.optional() }).strict();