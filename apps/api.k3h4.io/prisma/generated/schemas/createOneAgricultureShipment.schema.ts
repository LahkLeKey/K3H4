import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureShipmentSelectObjectSchema as AgricultureShipmentSelectObjectSchema } from './objects/AgricultureShipmentSelect.schema';
import { AgricultureShipmentIncludeObjectSchema as AgricultureShipmentIncludeObjectSchema } from './objects/AgricultureShipmentInclude.schema';
import { AgricultureShipmentCreateInputObjectSchema as AgricultureShipmentCreateInputObjectSchema } from './objects/AgricultureShipmentCreateInput.schema';
import { AgricultureShipmentUncheckedCreateInputObjectSchema as AgricultureShipmentUncheckedCreateInputObjectSchema } from './objects/AgricultureShipmentUncheckedCreateInput.schema';

export const AgricultureShipmentCreateOneSchema: z.ZodType<Prisma.AgricultureShipmentCreateArgs> = z.object({ select: AgricultureShipmentSelectObjectSchema.optional(), include: AgricultureShipmentIncludeObjectSchema.optional(), data: z.union([AgricultureShipmentCreateInputObjectSchema, AgricultureShipmentUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.AgricultureShipmentCreateArgs>;

export const AgricultureShipmentCreateOneZodSchema = z.object({ select: AgricultureShipmentSelectObjectSchema.optional(), include: AgricultureShipmentIncludeObjectSchema.optional(), data: z.union([AgricultureShipmentCreateInputObjectSchema, AgricultureShipmentUncheckedCreateInputObjectSchema]) }).strict();