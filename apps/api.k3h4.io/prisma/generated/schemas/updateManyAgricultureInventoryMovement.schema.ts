import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureInventoryMovementUpdateManyMutationInputObjectSchema as AgricultureInventoryMovementUpdateManyMutationInputObjectSchema } from './objects/AgricultureInventoryMovementUpdateManyMutationInput.schema';
import { AgricultureInventoryMovementWhereInputObjectSchema as AgricultureInventoryMovementWhereInputObjectSchema } from './objects/AgricultureInventoryMovementWhereInput.schema';

export const AgricultureInventoryMovementUpdateManySchema: z.ZodType<Prisma.AgricultureInventoryMovementUpdateManyArgs> = z.object({ data: AgricultureInventoryMovementUpdateManyMutationInputObjectSchema, where: AgricultureInventoryMovementWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementUpdateManyArgs>;

export const AgricultureInventoryMovementUpdateManyZodSchema = z.object({ data: AgricultureInventoryMovementUpdateManyMutationInputObjectSchema, where: AgricultureInventoryMovementWhereInputObjectSchema.optional() }).strict();