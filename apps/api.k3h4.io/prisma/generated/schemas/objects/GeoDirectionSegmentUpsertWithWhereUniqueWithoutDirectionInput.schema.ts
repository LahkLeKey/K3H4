import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionSegmentWhereUniqueInputObjectSchema as GeoDirectionSegmentWhereUniqueInputObjectSchema } from './GeoDirectionSegmentWhereUniqueInput.schema';
import { GeoDirectionSegmentUpdateWithoutDirectionInputObjectSchema as GeoDirectionSegmentUpdateWithoutDirectionInputObjectSchema } from './GeoDirectionSegmentUpdateWithoutDirectionInput.schema';
import { GeoDirectionSegmentUncheckedUpdateWithoutDirectionInputObjectSchema as GeoDirectionSegmentUncheckedUpdateWithoutDirectionInputObjectSchema } from './GeoDirectionSegmentUncheckedUpdateWithoutDirectionInput.schema';
import { GeoDirectionSegmentCreateWithoutDirectionInputObjectSchema as GeoDirectionSegmentCreateWithoutDirectionInputObjectSchema } from './GeoDirectionSegmentCreateWithoutDirectionInput.schema';
import { GeoDirectionSegmentUncheckedCreateWithoutDirectionInputObjectSchema as GeoDirectionSegmentUncheckedCreateWithoutDirectionInputObjectSchema } from './GeoDirectionSegmentUncheckedCreateWithoutDirectionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoDirectionSegmentWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => GeoDirectionSegmentUpdateWithoutDirectionInputObjectSchema), z.lazy(() => GeoDirectionSegmentUncheckedUpdateWithoutDirectionInputObjectSchema)]),
  create: z.union([z.lazy(() => GeoDirectionSegmentCreateWithoutDirectionInputObjectSchema), z.lazy(() => GeoDirectionSegmentUncheckedCreateWithoutDirectionInputObjectSchema)])
}).strict();
export const GeoDirectionSegmentUpsertWithWhereUniqueWithoutDirectionInputObjectSchema: z.ZodType<Prisma.GeoDirectionSegmentUpsertWithWhereUniqueWithoutDirectionInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionSegmentUpsertWithWhereUniqueWithoutDirectionInput>;
export const GeoDirectionSegmentUpsertWithWhereUniqueWithoutDirectionInputObjectZodSchema = makeSchema();
