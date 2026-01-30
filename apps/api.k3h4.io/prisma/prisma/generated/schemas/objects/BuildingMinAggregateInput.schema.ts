import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  osmId: z.literal(true).optional(),
  type: z.literal(true).optional(),
  addressHouseNumber: z.literal(true).optional(),
  addressStreet: z.literal(true).optional(),
  addressCity: z.literal(true).optional(),
  addressPostcode: z.literal(true).optional(),
  addressState: z.literal(true).optional(),
  addressCountry: z.literal(true).optional()
}).strict();
export const BuildingMinAggregateInputObjectSchema: z.ZodType<Prisma.BuildingMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.BuildingMinAggregateInputType>;
export const BuildingMinAggregateInputObjectZodSchema = makeSchema();
