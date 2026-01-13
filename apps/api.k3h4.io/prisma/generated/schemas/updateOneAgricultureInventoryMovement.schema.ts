import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureInventoryMovementSelectObjectSchema as AgricultureInventoryMovementSelectObjectSchema } from './objects/AgricultureInventoryMovementSelect.schema';
import { AgricultureInventoryMovementIncludeObjectSchema as AgricultureInventoryMovementIncludeObjectSchema } from './objects/AgricultureInventoryMovementInclude.schema';
import { AgricultureInventoryMovementUpdateInputObjectSchema as AgricultureInventoryMovementUpdateInputObjectSchema } from './objects/AgricultureInventoryMovementUpdateInput.schema';
import { AgricultureInventoryMovementUncheckedUpdateInputObjectSchema as AgricultureInventoryMovementUncheckedUpdateInputObjectSchema } from './objects/AgricultureInventoryMovementUncheckedUpdateInput.schema';
import { AgricultureInventoryMovementWhereUniqueInputObjectSchema as AgricultureInventoryMovementWhereUniqueInputObjectSchema } from './objects/AgricultureInventoryMovementWhereUniqueInput.schema';

export const AgricultureInventoryMovementUpdateOneSchema: z.ZodType<Prisma.AgricultureInventoryMovementUpdateArgs> = z.object({ select: AgricultureInventoryMovementSelectObjectSchema.optional(), include: AgricultureInventoryMovementIncludeObjectSchema.optional(), data: z.union([AgricultureInventoryMovementUpdateInputObjectSchema, AgricultureInventoryMovementUncheckedUpdateInputObjectSchema]), where: AgricultureInventoryMovementWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementUpdateArgs>;

export const AgricultureInventoryMovementUpdateOneZodSchema = z.object({ select: AgricultureInventoryMovementSelectObjectSchema.optional(), include: AgricultureInventoryMovementIncludeObjectSchema.optional(), data: z.union([AgricultureInventoryMovementUpdateInputObjectSchema, AgricultureInventoryMovementUncheckedUpdateInputObjectSchema]), where: AgricultureInventoryMovementWhereUniqueInputObjectSchema }).strict();