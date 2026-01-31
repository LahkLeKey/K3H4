import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorCreateWithoutGeoDirectionsInputObjectSchema as ActorCreateWithoutGeoDirectionsInputObjectSchema } from './ActorCreateWithoutGeoDirectionsInput.schema';
import { ActorUncheckedCreateWithoutGeoDirectionsInputObjectSchema as ActorUncheckedCreateWithoutGeoDirectionsInputObjectSchema } from './ActorUncheckedCreateWithoutGeoDirectionsInput.schema';
import { ActorCreateOrConnectWithoutGeoDirectionsInputObjectSchema as ActorCreateOrConnectWithoutGeoDirectionsInputObjectSchema } from './ActorCreateOrConnectWithoutGeoDirectionsInput.schema';
import { ActorWhereUniqueInputObjectSchema as ActorWhereUniqueInputObjectSchema } from './ActorWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ActorCreateWithoutGeoDirectionsInputObjectSchema), z.lazy(() => ActorUncheckedCreateWithoutGeoDirectionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ActorCreateOrConnectWithoutGeoDirectionsInputObjectSchema).optional(),
  connect: z.lazy(() => ActorWhereUniqueInputObjectSchema).optional()
}).strict();
export const ActorCreateNestedOneWithoutGeoDirectionsInputObjectSchema: z.ZodType<Prisma.ActorCreateNestedOneWithoutGeoDirectionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorCreateNestedOneWithoutGeoDirectionsInput>;
export const ActorCreateNestedOneWithoutGeoDirectionsInputObjectZodSchema = makeSchema();
