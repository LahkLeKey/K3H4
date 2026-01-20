import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoViewHistoryScalarWhereInputObjectSchema as GeoViewHistoryScalarWhereInputObjectSchema } from './GeoViewHistoryScalarWhereInput.schema';
import { GeoViewHistoryUpdateManyMutationInputObjectSchema as GeoViewHistoryUpdateManyMutationInputObjectSchema } from './GeoViewHistoryUpdateManyMutationInput.schema';
import { GeoViewHistoryUncheckedUpdateManyWithoutUserInputObjectSchema as GeoViewHistoryUncheckedUpdateManyWithoutUserInputObjectSchema } from './GeoViewHistoryUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoViewHistoryScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => GeoViewHistoryUpdateManyMutationInputObjectSchema), z.lazy(() => GeoViewHistoryUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const GeoViewHistoryUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.GeoViewHistoryUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoViewHistoryUpdateManyWithWhereWithoutUserInput>;
export const GeoViewHistoryUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
