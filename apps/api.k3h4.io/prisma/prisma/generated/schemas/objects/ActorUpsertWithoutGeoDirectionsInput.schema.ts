import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorUpdateWithoutGeoDirectionsInputObjectSchema as ActorUpdateWithoutGeoDirectionsInputObjectSchema } from './ActorUpdateWithoutGeoDirectionsInput.schema';
import { ActorUncheckedUpdateWithoutGeoDirectionsInputObjectSchema as ActorUncheckedUpdateWithoutGeoDirectionsInputObjectSchema } from './ActorUncheckedUpdateWithoutGeoDirectionsInput.schema';
import { ActorCreateWithoutGeoDirectionsInputObjectSchema as ActorCreateWithoutGeoDirectionsInputObjectSchema } from './ActorCreateWithoutGeoDirectionsInput.schema';
import { ActorUncheckedCreateWithoutGeoDirectionsInputObjectSchema as ActorUncheckedCreateWithoutGeoDirectionsInputObjectSchema } from './ActorUncheckedCreateWithoutGeoDirectionsInput.schema';
import { ActorWhereInputObjectSchema as ActorWhereInputObjectSchema } from './ActorWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ActorUpdateWithoutGeoDirectionsInputObjectSchema), z.lazy(() => ActorUncheckedUpdateWithoutGeoDirectionsInputObjectSchema)]),
  create: z.union([z.lazy(() => ActorCreateWithoutGeoDirectionsInputObjectSchema), z.lazy(() => ActorUncheckedCreateWithoutGeoDirectionsInputObjectSchema)]),
  where: z.lazy(() => ActorWhereInputObjectSchema).optional()
}).strict();
export const ActorUpsertWithoutGeoDirectionsInputObjectSchema: z.ZodType<Prisma.ActorUpsertWithoutGeoDirectionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorUpsertWithoutGeoDirectionsInput>;
export const ActorUpsertWithoutGeoDirectionsInputObjectZodSchema = makeSchema();
