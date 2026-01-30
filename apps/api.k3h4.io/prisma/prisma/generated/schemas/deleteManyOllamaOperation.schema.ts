import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OllamaOperationWhereInputObjectSchema as OllamaOperationWhereInputObjectSchema } from './objects/OllamaOperationWhereInput.schema';

export const OllamaOperationDeleteManySchema: z.ZodType<Prisma.OllamaOperationDeleteManyArgs> = z.object({ where: OllamaOperationWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.OllamaOperationDeleteManyArgs>;

export const OllamaOperationDeleteManyZodSchema = z.object({ where: OllamaOperationWhereInputObjectSchema.optional() }).strict();