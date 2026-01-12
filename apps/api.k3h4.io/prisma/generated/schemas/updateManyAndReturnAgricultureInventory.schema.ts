import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureInventorySelectObjectSchema as AgricultureInventorySelectObjectSchema } from './objects/AgricultureInventorySelect.schema';
import { AgricultureInventoryUpdateManyMutationInputObjectSchema as AgricultureInventoryUpdateManyMutationInputObjectSchema } from './objects/AgricultureInventoryUpdateManyMutationInput.schema';
import { AgricultureInventoryWhereInputObjectSchema as AgricultureInventoryWhereInputObjectSchema } from './objects/AgricultureInventoryWhereInput.schema';

export const AgricultureInventoryUpdateManyAndReturnSchema: z.ZodType<Prisma.AgricultureInventoryUpdateManyAndReturnArgs> = z.object({ select: AgricultureInventorySelectObjectSchema.optional(), data: AgricultureInventoryUpdateManyMutationInputObjectSchema, where: AgricultureInventoryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureInventoryUpdateManyAndReturnArgs>;

export const AgricultureInventoryUpdateManyAndReturnZodSchema = z.object({ select: AgricultureInventorySelectObjectSchema.optional(), data: AgricultureInventoryUpdateManyMutationInputObjectSchema, where: AgricultureInventoryWhereInputObjectSchema.optional() }).strict();