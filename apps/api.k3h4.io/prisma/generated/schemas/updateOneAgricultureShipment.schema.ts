import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureShipmentSelectObjectSchema as AgricultureShipmentSelectObjectSchema } from './objects/AgricultureShipmentSelect.schema';
import { AgricultureShipmentIncludeObjectSchema as AgricultureShipmentIncludeObjectSchema } from './objects/AgricultureShipmentInclude.schema';
import { AgricultureShipmentUpdateInputObjectSchema as AgricultureShipmentUpdateInputObjectSchema } from './objects/AgricultureShipmentUpdateInput.schema';
import { AgricultureShipmentUncheckedUpdateInputObjectSchema as AgricultureShipmentUncheckedUpdateInputObjectSchema } from './objects/AgricultureShipmentUncheckedUpdateInput.schema';
import { AgricultureShipmentWhereUniqueInputObjectSchema as AgricultureShipmentWhereUniqueInputObjectSchema } from './objects/AgricultureShipmentWhereUniqueInput.schema';

export const AgricultureShipmentUpdateOneSchema: z.ZodType<Prisma.AgricultureShipmentUpdateArgs> = z.object({ select: AgricultureShipmentSelectObjectSchema.optional(), include: AgricultureShipmentIncludeObjectSchema.optional(), data: z.union([AgricultureShipmentUpdateInputObjectSchema, AgricultureShipmentUncheckedUpdateInputObjectSchema]), where: AgricultureShipmentWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AgricultureShipmentUpdateArgs>;

export const AgricultureShipmentUpdateOneZodSchema = z.object({ select: AgricultureShipmentSelectObjectSchema.optional(), include: AgricultureShipmentIncludeObjectSchema.optional(), data: z.union([AgricultureShipmentUpdateInputObjectSchema, AgricultureShipmentUncheckedUpdateInputObjectSchema]), where: AgricultureShipmentWhereUniqueInputObjectSchema }).strict();