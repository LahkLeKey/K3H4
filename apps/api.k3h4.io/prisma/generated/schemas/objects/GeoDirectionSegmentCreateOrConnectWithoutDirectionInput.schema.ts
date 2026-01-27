import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionSegmentWhereUniqueInputObjectSchema as GeoDirectionSegmentWhereUniqueInputObjectSchema } from './GeoDirectionSegmentWhereUniqueInput.schema';
import { GeoDirectionSegmentCreateWithoutDirectionInputObjectSchema as GeoDirectionSegmentCreateWithoutDirectionInputObjectSchema } from './GeoDirectionSegmentCreateWithoutDirectionInput.schema';
import { GeoDirectionSegmentUncheckedCreateWithoutDirectionInputObjectSchema as GeoDirectionSegmentUncheckedCreateWithoutDirectionInputObjectSchema } from './GeoDirectionSegmentUncheckedCreateWithoutDirectionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoDirectionSegmentWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => GeoDirectionSegmentCreateWithoutDirectionInputObjectSchema), z.lazy(() => GeoDirectionSegmentUncheckedCreateWithoutDirectionInputObjectSchema)])
}).strict();
export const GeoDirectionSegmentCreateOrConnectWithoutDirectionInputObjectSchema: z.ZodType<Prisma.GeoDirectionSegmentCreateOrConnectWithoutDirectionInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionSegmentCreateOrConnectWithoutDirectionInput>;
export const GeoDirectionSegmentCreateOrConnectWithoutDirectionInputObjectZodSchema = makeSchema();
