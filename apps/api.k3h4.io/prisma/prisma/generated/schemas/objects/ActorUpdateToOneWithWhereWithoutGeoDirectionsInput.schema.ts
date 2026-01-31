import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorWhereInputObjectSchema as ActorWhereInputObjectSchema } from './ActorWhereInput.schema';
import { ActorUpdateWithoutGeoDirectionsInputObjectSchema as ActorUpdateWithoutGeoDirectionsInputObjectSchema } from './ActorUpdateWithoutGeoDirectionsInput.schema';
import { ActorUncheckedUpdateWithoutGeoDirectionsInputObjectSchema as ActorUncheckedUpdateWithoutGeoDirectionsInputObjectSchema } from './ActorUncheckedUpdateWithoutGeoDirectionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ActorWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ActorUpdateWithoutGeoDirectionsInputObjectSchema), z.lazy(() => ActorUncheckedUpdateWithoutGeoDirectionsInputObjectSchema)])
}).strict();
export const ActorUpdateToOneWithWhereWithoutGeoDirectionsInputObjectSchema: z.ZodType<Prisma.ActorUpdateToOneWithWhereWithoutGeoDirectionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorUpdateToOneWithWhereWithoutGeoDirectionsInput>;
export const ActorUpdateToOneWithWhereWithoutGeoDirectionsInputObjectZodSchema = makeSchema();
