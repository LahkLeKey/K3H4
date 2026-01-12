import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureShipmentWhereInputObjectSchema as AgricultureShipmentWhereInputObjectSchema } from './objects/AgricultureShipmentWhereInput.schema';

export const AgricultureShipmentDeleteManySchema: z.ZodType<Prisma.AgricultureShipmentDeleteManyArgs> = z.object({ where: AgricultureShipmentWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureShipmentDeleteManyArgs>;

export const AgricultureShipmentDeleteManyZodSchema = z.object({ where: AgricultureShipmentWhereInputObjectSchema.optional() }).strict();