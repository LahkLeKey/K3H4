import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PoiFindManySchema as PoiFindManySchema } from '../findManyPoi.schema';
import { BuildingCountOutputTypeArgsObjectSchema as BuildingCountOutputTypeArgsObjectSchema } from './BuildingCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  osmId: z.boolean().optional(),
  type: z.boolean().optional(),
  addressHouseNumber: z.boolean().optional(),
  addressStreet: z.boolean().optional(),
  addressCity: z.boolean().optional(),
  addressPostcode: z.boolean().optional(),
  addressState: z.boolean().optional(),
  addressCountry: z.boolean().optional(),
  geometry: z.boolean().optional(),
  POIs: z.union([z.boolean(), z.lazy(() => PoiFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => BuildingCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const BuildingSelectObjectSchema: z.ZodType<Prisma.BuildingSelect> = makeSchema() as unknown as z.ZodType<Prisma.BuildingSelect>;
export const BuildingSelectObjectZodSchema = makeSchema();
