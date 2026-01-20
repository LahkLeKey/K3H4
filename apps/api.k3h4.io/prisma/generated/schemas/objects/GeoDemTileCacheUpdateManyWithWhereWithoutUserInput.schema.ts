import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDemTileCacheScalarWhereInputObjectSchema as GeoDemTileCacheScalarWhereInputObjectSchema } from './GeoDemTileCacheScalarWhereInput.schema';
import { GeoDemTileCacheUpdateManyMutationInputObjectSchema as GeoDemTileCacheUpdateManyMutationInputObjectSchema } from './GeoDemTileCacheUpdateManyMutationInput.schema';
import { GeoDemTileCacheUncheckedUpdateManyWithoutUserInputObjectSchema as GeoDemTileCacheUncheckedUpdateManyWithoutUserInputObjectSchema } from './GeoDemTileCacheUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoDemTileCacheScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => GeoDemTileCacheUpdateManyMutationInputObjectSchema), z.lazy(() => GeoDemTileCacheUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const GeoDemTileCacheUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.GeoDemTileCacheUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDemTileCacheUpdateManyWithWhereWithoutUserInput>;
export const GeoDemTileCacheUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
