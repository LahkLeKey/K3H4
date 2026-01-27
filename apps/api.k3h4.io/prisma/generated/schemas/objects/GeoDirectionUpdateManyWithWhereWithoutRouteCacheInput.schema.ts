import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionScalarWhereInputObjectSchema as GeoDirectionScalarWhereInputObjectSchema } from './GeoDirectionScalarWhereInput.schema';
import { GeoDirectionUpdateManyMutationInputObjectSchema as GeoDirectionUpdateManyMutationInputObjectSchema } from './GeoDirectionUpdateManyMutationInput.schema';
import { GeoDirectionUncheckedUpdateManyWithoutRouteCacheInputObjectSchema as GeoDirectionUncheckedUpdateManyWithoutRouteCacheInputObjectSchema } from './GeoDirectionUncheckedUpdateManyWithoutRouteCacheInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoDirectionScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => GeoDirectionUpdateManyMutationInputObjectSchema), z.lazy(() => GeoDirectionUncheckedUpdateManyWithoutRouteCacheInputObjectSchema)])
}).strict();
export const GeoDirectionUpdateManyWithWhereWithoutRouteCacheInputObjectSchema: z.ZodType<Prisma.GeoDirectionUpdateManyWithWhereWithoutRouteCacheInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionUpdateManyWithWhereWithoutRouteCacheInput>;
export const GeoDirectionUpdateManyWithWhereWithoutRouteCacheInputObjectZodSchema = makeSchema();
