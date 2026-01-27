import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionSegmentScalarWhereInputObjectSchema as GeoDirectionSegmentScalarWhereInputObjectSchema } from './GeoDirectionSegmentScalarWhereInput.schema';
import { GeoDirectionSegmentUpdateManyMutationInputObjectSchema as GeoDirectionSegmentUpdateManyMutationInputObjectSchema } from './GeoDirectionSegmentUpdateManyMutationInput.schema';
import { GeoDirectionSegmentUncheckedUpdateManyWithoutDirectionInputObjectSchema as GeoDirectionSegmentUncheckedUpdateManyWithoutDirectionInputObjectSchema } from './GeoDirectionSegmentUncheckedUpdateManyWithoutDirectionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoDirectionSegmentScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => GeoDirectionSegmentUpdateManyMutationInputObjectSchema), z.lazy(() => GeoDirectionSegmentUncheckedUpdateManyWithoutDirectionInputObjectSchema)])
}).strict();
export const GeoDirectionSegmentUpdateManyWithWhereWithoutDirectionInputObjectSchema: z.ZodType<Prisma.GeoDirectionSegmentUpdateManyWithWhereWithoutDirectionInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionSegmentUpdateManyWithWhereWithoutDirectionInput>;
export const GeoDirectionSegmentUpdateManyWithWhereWithoutDirectionInputObjectZodSchema = makeSchema();
