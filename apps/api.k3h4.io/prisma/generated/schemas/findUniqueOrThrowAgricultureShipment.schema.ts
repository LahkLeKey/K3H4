import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureShipmentSelectObjectSchema as AgricultureShipmentSelectObjectSchema } from './objects/AgricultureShipmentSelect.schema';
import { AgricultureShipmentIncludeObjectSchema as AgricultureShipmentIncludeObjectSchema } from './objects/AgricultureShipmentInclude.schema';
import { AgricultureShipmentWhereUniqueInputObjectSchema as AgricultureShipmentWhereUniqueInputObjectSchema } from './objects/AgricultureShipmentWhereUniqueInput.schema';

export const AgricultureShipmentFindUniqueOrThrowSchema: z.ZodType<Prisma.AgricultureShipmentFindUniqueOrThrowArgs> = z.object({ select: AgricultureShipmentSelectObjectSchema.optional(), include: AgricultureShipmentIncludeObjectSchema.optional(), where: AgricultureShipmentWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AgricultureShipmentFindUniqueOrThrowArgs>;

export const AgricultureShipmentFindUniqueOrThrowZodSchema = z.object({ select: AgricultureShipmentSelectObjectSchema.optional(), include: AgricultureShipmentIncludeObjectSchema.optional(), where: AgricultureShipmentWhereUniqueInputObjectSchema }).strict();