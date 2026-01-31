import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorCreateWithoutGeoDirectionsInputObjectSchema as ActorCreateWithoutGeoDirectionsInputObjectSchema } from './ActorCreateWithoutGeoDirectionsInput.schema';
import { ActorUncheckedCreateWithoutGeoDirectionsInputObjectSchema as ActorUncheckedCreateWithoutGeoDirectionsInputObjectSchema } from './ActorUncheckedCreateWithoutGeoDirectionsInput.schema';
import { ActorCreateOrConnectWithoutGeoDirectionsInputObjectSchema as ActorCreateOrConnectWithoutGeoDirectionsInputObjectSchema } from './ActorCreateOrConnectWithoutGeoDirectionsInput.schema';
import { ActorUpsertWithoutGeoDirectionsInputObjectSchema as ActorUpsertWithoutGeoDirectionsInputObjectSchema } from './ActorUpsertWithoutGeoDirectionsInput.schema';
import { ActorWhereInputObjectSchema as ActorWhereInputObjectSchema } from './ActorWhereInput.schema';
import { ActorWhereUniqueInputObjectSchema as ActorWhereUniqueInputObjectSchema } from './ActorWhereUniqueInput.schema';
import { ActorUpdateToOneWithWhereWithoutGeoDirectionsInputObjectSchema as ActorUpdateToOneWithWhereWithoutGeoDirectionsInputObjectSchema } from './ActorUpdateToOneWithWhereWithoutGeoDirectionsInput.schema';
import { ActorUpdateWithoutGeoDirectionsInputObjectSchema as ActorUpdateWithoutGeoDirectionsInputObjectSchema } from './ActorUpdateWithoutGeoDirectionsInput.schema';
import { ActorUncheckedUpdateWithoutGeoDirectionsInputObjectSchema as ActorUncheckedUpdateWithoutGeoDirectionsInputObjectSchema } from './ActorUncheckedUpdateWithoutGeoDirectionsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ActorCreateWithoutGeoDirectionsInputObjectSchema), z.lazy(() => ActorUncheckedCreateWithoutGeoDirectionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ActorCreateOrConnectWithoutGeoDirectionsInputObjectSchema).optional(),
  upsert: z.lazy(() => ActorUpsertWithoutGeoDirectionsInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => ActorWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => ActorWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => ActorWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ActorUpdateToOneWithWhereWithoutGeoDirectionsInputObjectSchema), z.lazy(() => ActorUpdateWithoutGeoDirectionsInputObjectSchema), z.lazy(() => ActorUncheckedUpdateWithoutGeoDirectionsInputObjectSchema)]).optional()
}).strict();
export const ActorUpdateOneWithoutGeoDirectionsNestedInputObjectSchema: z.ZodType<Prisma.ActorUpdateOneWithoutGeoDirectionsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorUpdateOneWithoutGeoDirectionsNestedInput>;
export const ActorUpdateOneWithoutGeoDirectionsNestedInputObjectZodSchema = makeSchema();
