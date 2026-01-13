import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureShipmentCreateManyInputObjectSchema as AgricultureShipmentCreateManyInputObjectSchema } from './objects/AgricultureShipmentCreateManyInput.schema';

export const AgricultureShipmentCreateManySchema: z.ZodType<Prisma.AgricultureShipmentCreateManyArgs> = z.object({ data: z.union([ AgricultureShipmentCreateManyInputObjectSchema, z.array(AgricultureShipmentCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureShipmentCreateManyArgs>;

export const AgricultureShipmentCreateManyZodSchema = z.object({ data: z.union([ AgricultureShipmentCreateManyInputObjectSchema, z.array(AgricultureShipmentCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();