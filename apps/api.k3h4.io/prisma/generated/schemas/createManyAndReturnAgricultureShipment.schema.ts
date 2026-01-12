import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureShipmentSelectObjectSchema as AgricultureShipmentSelectObjectSchema } from './objects/AgricultureShipmentSelect.schema';
import { AgricultureShipmentCreateManyInputObjectSchema as AgricultureShipmentCreateManyInputObjectSchema } from './objects/AgricultureShipmentCreateManyInput.schema';

export const AgricultureShipmentCreateManyAndReturnSchema: z.ZodType<Prisma.AgricultureShipmentCreateManyAndReturnArgs> = z.object({ select: AgricultureShipmentSelectObjectSchema.optional(), data: z.union([ AgricultureShipmentCreateManyInputObjectSchema, z.array(AgricultureShipmentCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureShipmentCreateManyAndReturnArgs>;

export const AgricultureShipmentCreateManyAndReturnZodSchema = z.object({ select: AgricultureShipmentSelectObjectSchema.optional(), data: z.union([ AgricultureShipmentCreateManyInputObjectSchema, z.array(AgricultureShipmentCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();