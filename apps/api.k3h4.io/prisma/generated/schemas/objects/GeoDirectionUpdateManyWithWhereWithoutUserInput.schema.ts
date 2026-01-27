import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionScalarWhereInputObjectSchema as GeoDirectionScalarWhereInputObjectSchema } from './GeoDirectionScalarWhereInput.schema';
import { GeoDirectionUpdateManyMutationInputObjectSchema as GeoDirectionUpdateManyMutationInputObjectSchema } from './GeoDirectionUpdateManyMutationInput.schema';
import { GeoDirectionUncheckedUpdateManyWithoutUserInputObjectSchema as GeoDirectionUncheckedUpdateManyWithoutUserInputObjectSchema } from './GeoDirectionUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoDirectionScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => GeoDirectionUpdateManyMutationInputObjectSchema), z.lazy(() => GeoDirectionUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const GeoDirectionUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.GeoDirectionUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionUpdateManyWithWhereWithoutUserInput>;
export const GeoDirectionUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
