import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorCreateWithoutEntitiesInputObjectSchema as ActorCreateWithoutEntitiesInputObjectSchema } from './ActorCreateWithoutEntitiesInput.schema';
import { ActorUncheckedCreateWithoutEntitiesInputObjectSchema as ActorUncheckedCreateWithoutEntitiesInputObjectSchema } from './ActorUncheckedCreateWithoutEntitiesInput.schema';
import { ActorCreateOrConnectWithoutEntitiesInputObjectSchema as ActorCreateOrConnectWithoutEntitiesInputObjectSchema } from './ActorCreateOrConnectWithoutEntitiesInput.schema';
import { ActorWhereUniqueInputObjectSchema as ActorWhereUniqueInputObjectSchema } from './ActorWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ActorCreateWithoutEntitiesInputObjectSchema), z.lazy(() => ActorUncheckedCreateWithoutEntitiesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ActorCreateOrConnectWithoutEntitiesInputObjectSchema).optional(),
  connect: z.lazy(() => ActorWhereUniqueInputObjectSchema).optional()
}).strict();
export const ActorCreateNestedOneWithoutEntitiesInputObjectSchema: z.ZodType<Prisma.ActorCreateNestedOneWithoutEntitiesInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorCreateNestedOneWithoutEntitiesInput>;
export const ActorCreateNestedOneWithoutEntitiesInputObjectZodSchema = makeSchema();
