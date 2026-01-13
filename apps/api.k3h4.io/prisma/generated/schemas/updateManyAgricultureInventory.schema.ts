import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureInventoryUpdateManyMutationInputObjectSchema as AgricultureInventoryUpdateManyMutationInputObjectSchema } from './objects/AgricultureInventoryUpdateManyMutationInput.schema';
import { AgricultureInventoryWhereInputObjectSchema as AgricultureInventoryWhereInputObjectSchema } from './objects/AgricultureInventoryWhereInput.schema';

export const AgricultureInventoryUpdateManySchema: z.ZodType<Prisma.AgricultureInventoryUpdateManyArgs> = z.object({ data: AgricultureInventoryUpdateManyMutationInputObjectSchema, where: AgricultureInventoryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureInventoryUpdateManyArgs>;

export const AgricultureInventoryUpdateManyZodSchema = z.object({ data: AgricultureInventoryUpdateManyMutationInputObjectSchema, where: AgricultureInventoryWhereInputObjectSchema.optional() }).strict();