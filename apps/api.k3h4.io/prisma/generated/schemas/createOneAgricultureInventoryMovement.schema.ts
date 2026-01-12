import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureInventoryMovementSelectObjectSchema as AgricultureInventoryMovementSelectObjectSchema } from './objects/AgricultureInventoryMovementSelect.schema';
import { AgricultureInventoryMovementIncludeObjectSchema as AgricultureInventoryMovementIncludeObjectSchema } from './objects/AgricultureInventoryMovementInclude.schema';
import { AgricultureInventoryMovementCreateInputObjectSchema as AgricultureInventoryMovementCreateInputObjectSchema } from './objects/AgricultureInventoryMovementCreateInput.schema';
import { AgricultureInventoryMovementUncheckedCreateInputObjectSchema as AgricultureInventoryMovementUncheckedCreateInputObjectSchema } from './objects/AgricultureInventoryMovementUncheckedCreateInput.schema';

export const AgricultureInventoryMovementCreateOneSchema: z.ZodType<Prisma.AgricultureInventoryMovementCreateArgs> = z.object({ select: AgricultureInventoryMovementSelectObjectSchema.optional(), include: AgricultureInventoryMovementIncludeObjectSchema.optional(), data: z.union([AgricultureInventoryMovementCreateInputObjectSchema, AgricultureInventoryMovementUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementCreateArgs>;

export const AgricultureInventoryMovementCreateOneZodSchema = z.object({ select: AgricultureInventoryMovementSelectObjectSchema.optional(), include: AgricultureInventoryMovementIncludeObjectSchema.optional(), data: z.union([AgricultureInventoryMovementCreateInputObjectSchema, AgricultureInventoryMovementUncheckedCreateInputObjectSchema]) }).strict();