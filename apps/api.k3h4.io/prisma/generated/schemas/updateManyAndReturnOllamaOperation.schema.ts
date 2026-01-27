import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OllamaOperationSelectObjectSchema as OllamaOperationSelectObjectSchema } from './objects/OllamaOperationSelect.schema';
import { OllamaOperationUpdateManyMutationInputObjectSchema as OllamaOperationUpdateManyMutationInputObjectSchema } from './objects/OllamaOperationUpdateManyMutationInput.schema';
import { OllamaOperationWhereInputObjectSchema as OllamaOperationWhereInputObjectSchema } from './objects/OllamaOperationWhereInput.schema';

export const OllamaOperationUpdateManyAndReturnSchema: z.ZodType<Prisma.OllamaOperationUpdateManyAndReturnArgs> = z.object({ select: OllamaOperationSelectObjectSchema.optional(), data: OllamaOperationUpdateManyMutationInputObjectSchema, where: OllamaOperationWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.OllamaOperationUpdateManyAndReturnArgs>;

export const OllamaOperationUpdateManyAndReturnZodSchema = z.object({ select: OllamaOperationSelectObjectSchema.optional(), data: OllamaOperationUpdateManyMutationInputObjectSchema, where: OllamaOperationWhereInputObjectSchema.optional() }).strict();