import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureShipmentUpdateManyMutationInputObjectSchema as AgricultureShipmentUpdateManyMutationInputObjectSchema } from './objects/AgricultureShipmentUpdateManyMutationInput.schema';
import { AgricultureShipmentWhereInputObjectSchema as AgricultureShipmentWhereInputObjectSchema } from './objects/AgricultureShipmentWhereInput.schema';

export const AgricultureShipmentUpdateManySchema: z.ZodType<Prisma.AgricultureShipmentUpdateManyArgs> = z.object({ data: AgricultureShipmentUpdateManyMutationInputObjectSchema, where: AgricultureShipmentWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureShipmentUpdateManyArgs>;

export const AgricultureShipmentUpdateManyZodSchema = z.object({ data: AgricultureShipmentUpdateManyMutationInputObjectSchema, where: AgricultureShipmentWhereInputObjectSchema.optional() }).strict();