import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoStatusLogScalarWhereInputObjectSchema as GeoStatusLogScalarWhereInputObjectSchema } from './GeoStatusLogScalarWhereInput.schema';
import { GeoStatusLogUpdateManyMutationInputObjectSchema as GeoStatusLogUpdateManyMutationInputObjectSchema } from './GeoStatusLogUpdateManyMutationInput.schema';
import { GeoStatusLogUncheckedUpdateManyWithoutUserInputObjectSchema as GeoStatusLogUncheckedUpdateManyWithoutUserInputObjectSchema } from './GeoStatusLogUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoStatusLogScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => GeoStatusLogUpdateManyMutationInputObjectSchema), z.lazy(() => GeoStatusLogUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const GeoStatusLogUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.GeoStatusLogUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoStatusLogUpdateManyWithWhereWithoutUserInput>;
export const GeoStatusLogUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
