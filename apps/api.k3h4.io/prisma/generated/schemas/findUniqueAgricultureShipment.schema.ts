import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureShipmentSelectObjectSchema as AgricultureShipmentSelectObjectSchema } from './objects/AgricultureShipmentSelect.schema';
import { AgricultureShipmentIncludeObjectSchema as AgricultureShipmentIncludeObjectSchema } from './objects/AgricultureShipmentInclude.schema';
import { AgricultureShipmentWhereUniqueInputObjectSchema as AgricultureShipmentWhereUniqueInputObjectSchema } from './objects/AgricultureShipmentWhereUniqueInput.schema';

export const AgricultureShipmentFindUniqueSchema: z.ZodType<Prisma.AgricultureShipmentFindUniqueArgs> = z.object({ select: AgricultureShipmentSelectObjectSchema.optional(), include: AgricultureShipmentIncludeObjectSchema.optional(), where: AgricultureShipmentWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AgricultureShipmentFindUniqueArgs>;

export const AgricultureShipmentFindUniqueZodSchema = z.object({ select: AgricultureShipmentSelectObjectSchema.optional(), include: AgricultureShipmentIncludeObjectSchema.optional(), where: AgricultureShipmentWhereUniqueInputObjectSchema }).strict();