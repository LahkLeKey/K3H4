import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionStopScalarWhereInputObjectSchema as GeoDirectionStopScalarWhereInputObjectSchema } from './GeoDirectionStopScalarWhereInput.schema';
import { GeoDirectionStopUpdateManyMutationInputObjectSchema as GeoDirectionStopUpdateManyMutationInputObjectSchema } from './GeoDirectionStopUpdateManyMutationInput.schema';
import { GeoDirectionStopUncheckedUpdateManyWithoutDirectionInputObjectSchema as GeoDirectionStopUncheckedUpdateManyWithoutDirectionInputObjectSchema } from './GeoDirectionStopUncheckedUpdateManyWithoutDirectionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoDirectionStopScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => GeoDirectionStopUpdateManyMutationInputObjectSchema), z.lazy(() => GeoDirectionStopUncheckedUpdateManyWithoutDirectionInputObjectSchema)])
}).strict();
export const GeoDirectionStopUpdateManyWithWhereWithoutDirectionInputObjectSchema: z.ZodType<Prisma.GeoDirectionStopUpdateManyWithWhereWithoutDirectionInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionStopUpdateManyWithWhereWithoutDirectionInput>;
export const GeoDirectionStopUpdateManyWithWhereWithoutDirectionInputObjectZodSchema = makeSchema();
