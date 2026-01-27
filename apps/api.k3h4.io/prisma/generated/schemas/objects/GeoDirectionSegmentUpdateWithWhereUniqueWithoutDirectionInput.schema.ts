import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionSegmentWhereUniqueInputObjectSchema as GeoDirectionSegmentWhereUniqueInputObjectSchema } from './GeoDirectionSegmentWhereUniqueInput.schema';
import { GeoDirectionSegmentUpdateWithoutDirectionInputObjectSchema as GeoDirectionSegmentUpdateWithoutDirectionInputObjectSchema } from './GeoDirectionSegmentUpdateWithoutDirectionInput.schema';
import { GeoDirectionSegmentUncheckedUpdateWithoutDirectionInputObjectSchema as GeoDirectionSegmentUncheckedUpdateWithoutDirectionInputObjectSchema } from './GeoDirectionSegmentUncheckedUpdateWithoutDirectionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoDirectionSegmentWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => GeoDirectionSegmentUpdateWithoutDirectionInputObjectSchema), z.lazy(() => GeoDirectionSegmentUncheckedUpdateWithoutDirectionInputObjectSchema)])
}).strict();
export const GeoDirectionSegmentUpdateWithWhereUniqueWithoutDirectionInputObjectSchema: z.ZodType<Prisma.GeoDirectionSegmentUpdateWithWhereUniqueWithoutDirectionInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionSegmentUpdateWithWhereUniqueWithoutDirectionInput>;
export const GeoDirectionSegmentUpdateWithWhereUniqueWithoutDirectionInputObjectZodSchema = makeSchema();
