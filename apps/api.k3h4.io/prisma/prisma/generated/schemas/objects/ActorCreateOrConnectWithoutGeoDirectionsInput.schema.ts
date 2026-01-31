import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorWhereUniqueInputObjectSchema as ActorWhereUniqueInputObjectSchema } from './ActorWhereUniqueInput.schema';
import { ActorCreateWithoutGeoDirectionsInputObjectSchema as ActorCreateWithoutGeoDirectionsInputObjectSchema } from './ActorCreateWithoutGeoDirectionsInput.schema';
import { ActorUncheckedCreateWithoutGeoDirectionsInputObjectSchema as ActorUncheckedCreateWithoutGeoDirectionsInputObjectSchema } from './ActorUncheckedCreateWithoutGeoDirectionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ActorWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ActorCreateWithoutGeoDirectionsInputObjectSchema), z.lazy(() => ActorUncheckedCreateWithoutGeoDirectionsInputObjectSchema)])
}).strict();
export const ActorCreateOrConnectWithoutGeoDirectionsInputObjectSchema: z.ZodType<Prisma.ActorCreateOrConnectWithoutGeoDirectionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorCreateOrConnectWithoutGeoDirectionsInput>;
export const ActorCreateOrConnectWithoutGeoDirectionsInputObjectZodSchema = makeSchema();
