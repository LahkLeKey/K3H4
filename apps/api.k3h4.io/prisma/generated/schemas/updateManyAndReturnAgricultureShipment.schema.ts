import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureShipmentSelectObjectSchema as AgricultureShipmentSelectObjectSchema } from './objects/AgricultureShipmentSelect.schema';
import { AgricultureShipmentUpdateManyMutationInputObjectSchema as AgricultureShipmentUpdateManyMutationInputObjectSchema } from './objects/AgricultureShipmentUpdateManyMutationInput.schema';
import { AgricultureShipmentWhereInputObjectSchema as AgricultureShipmentWhereInputObjectSchema } from './objects/AgricultureShipmentWhereInput.schema';

export const AgricultureShipmentUpdateManyAndReturnSchema: z.ZodType<Prisma.AgricultureShipmentUpdateManyAndReturnArgs> = z.object({ select: AgricultureShipmentSelectObjectSchema.optional(), data: AgricultureShipmentUpdateManyMutationInputObjectSchema, where: AgricultureShipmentWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureShipmentUpdateManyAndReturnArgs>;

export const AgricultureShipmentUpdateManyAndReturnZodSchema = z.object({ select: AgricultureShipmentSelectObjectSchema.optional(), data: AgricultureShipmentUpdateManyMutationInputObjectSchema, where: AgricultureShipmentWhereInputObjectSchema.optional() }).strict();