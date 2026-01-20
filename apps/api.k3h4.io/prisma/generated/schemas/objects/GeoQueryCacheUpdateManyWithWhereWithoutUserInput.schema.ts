import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoQueryCacheScalarWhereInputObjectSchema as GeoQueryCacheScalarWhereInputObjectSchema } from './GeoQueryCacheScalarWhereInput.schema';
import { GeoQueryCacheUpdateManyMutationInputObjectSchema as GeoQueryCacheUpdateManyMutationInputObjectSchema } from './GeoQueryCacheUpdateManyMutationInput.schema';
import { GeoQueryCacheUncheckedUpdateManyWithoutUserInputObjectSchema as GeoQueryCacheUncheckedUpdateManyWithoutUserInputObjectSchema } from './GeoQueryCacheUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoQueryCacheScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => GeoQueryCacheUpdateManyMutationInputObjectSchema), z.lazy(() => GeoQueryCacheUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const GeoQueryCacheUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.GeoQueryCacheUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoQueryCacheUpdateManyWithWhereWithoutUserInput>;
export const GeoQueryCacheUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
