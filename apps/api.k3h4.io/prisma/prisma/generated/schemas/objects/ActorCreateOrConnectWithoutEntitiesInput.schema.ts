import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorWhereUniqueInputObjectSchema as ActorWhereUniqueInputObjectSchema } from './ActorWhereUniqueInput.schema';
import { ActorCreateWithoutEntitiesInputObjectSchema as ActorCreateWithoutEntitiesInputObjectSchema } from './ActorCreateWithoutEntitiesInput.schema';
import { ActorUncheckedCreateWithoutEntitiesInputObjectSchema as ActorUncheckedCreateWithoutEntitiesInputObjectSchema } from './ActorUncheckedCreateWithoutEntitiesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ActorWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ActorCreateWithoutEntitiesInputObjectSchema), z.lazy(() => ActorUncheckedCreateWithoutEntitiesInputObjectSchema)])
}).strict();
export const ActorCreateOrConnectWithoutEntitiesInputObjectSchema: z.ZodType<Prisma.ActorCreateOrConnectWithoutEntitiesInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorCreateOrConnectWithoutEntitiesInput>;
export const ActorCreateOrConnectWithoutEntitiesInputObjectZodSchema = makeSchema();
