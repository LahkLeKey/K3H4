import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionScalarWhereInputObjectSchema as GeoDirectionScalarWhereInputObjectSchema } from './GeoDirectionScalarWhereInput.schema';
import { GeoDirectionUpdateManyMutationInputObjectSchema as GeoDirectionUpdateManyMutationInputObjectSchema } from './GeoDirectionUpdateManyMutationInput.schema';
import { GeoDirectionUncheckedUpdateManyWithoutActorInputObjectSchema as GeoDirectionUncheckedUpdateManyWithoutActorInputObjectSchema } from './GeoDirectionUncheckedUpdateManyWithoutActorInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoDirectionScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => GeoDirectionUpdateManyMutationInputObjectSchema), z.lazy(() => GeoDirectionUncheckedUpdateManyWithoutActorInputObjectSchema)])
}).strict();
export const GeoDirectionUpdateManyWithWhereWithoutActorInputObjectSchema: z.ZodType<Prisma.GeoDirectionUpdateManyWithWhereWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionUpdateManyWithWhereWithoutActorInput>;
export const GeoDirectionUpdateManyWithWhereWithoutActorInputObjectZodSchema = makeSchema();
