import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureInventoryMovementSelectObjectSchema as AgricultureInventoryMovementSelectObjectSchema } from './objects/AgricultureInventoryMovementSelect.schema';
import { AgricultureInventoryMovementUpdateManyMutationInputObjectSchema as AgricultureInventoryMovementUpdateManyMutationInputObjectSchema } from './objects/AgricultureInventoryMovementUpdateManyMutationInput.schema';
import { AgricultureInventoryMovementWhereInputObjectSchema as AgricultureInventoryMovementWhereInputObjectSchema } from './objects/AgricultureInventoryMovementWhereInput.schema';

export const AgricultureInventoryMovementUpdateManyAndReturnSchema: z.ZodType<Prisma.AgricultureInventoryMovementUpdateManyAndReturnArgs> = z.object({ select: AgricultureInventoryMovementSelectObjectSchema.optional(), data: AgricultureInventoryMovementUpdateManyMutationInputObjectSchema, where: AgricultureInventoryMovementWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementUpdateManyAndReturnArgs>;

export const AgricultureInventoryMovementUpdateManyAndReturnZodSchema = z.object({ select: AgricultureInventoryMovementSelectObjectSchema.optional(), data: AgricultureInventoryMovementUpdateManyMutationInputObjectSchema, where: AgricultureInventoryMovementWhereInputObjectSchema.optional() }).strict();