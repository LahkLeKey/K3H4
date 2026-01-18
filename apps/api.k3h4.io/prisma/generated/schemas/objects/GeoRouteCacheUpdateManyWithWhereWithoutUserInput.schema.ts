import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoRouteCacheScalarWhereInputObjectSchema as GeoRouteCacheScalarWhereInputObjectSchema } from './GeoRouteCacheScalarWhereInput.schema';
import { GeoRouteCacheUpdateManyMutationInputObjectSchema as GeoRouteCacheUpdateManyMutationInputObjectSchema } from './GeoRouteCacheUpdateManyMutationInput.schema';
import { GeoRouteCacheUncheckedUpdateManyWithoutUserInputObjectSchema as GeoRouteCacheUncheckedUpdateManyWithoutUserInputObjectSchema } from './GeoRouteCacheUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoRouteCacheScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => GeoRouteCacheUpdateManyMutationInputObjectSchema), z.lazy(() => GeoRouteCacheUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const GeoRouteCacheUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.GeoRouteCacheUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoRouteCacheUpdateManyWithWhereWithoutUserInput>;
export const GeoRouteCacheUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
