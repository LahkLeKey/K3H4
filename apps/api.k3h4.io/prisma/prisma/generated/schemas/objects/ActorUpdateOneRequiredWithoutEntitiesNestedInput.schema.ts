import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorCreateWithoutEntitiesInputObjectSchema as ActorCreateWithoutEntitiesInputObjectSchema } from './ActorCreateWithoutEntitiesInput.schema';
import { ActorUncheckedCreateWithoutEntitiesInputObjectSchema as ActorUncheckedCreateWithoutEntitiesInputObjectSchema } from './ActorUncheckedCreateWithoutEntitiesInput.schema';
import { ActorCreateOrConnectWithoutEntitiesInputObjectSchema as ActorCreateOrConnectWithoutEntitiesInputObjectSchema } from './ActorCreateOrConnectWithoutEntitiesInput.schema';
import { ActorUpsertWithoutEntitiesInputObjectSchema as ActorUpsertWithoutEntitiesInputObjectSchema } from './ActorUpsertWithoutEntitiesInput.schema';
import { ActorWhereUniqueInputObjectSchema as ActorWhereUniqueInputObjectSchema } from './ActorWhereUniqueInput.schema';
import { ActorUpdateToOneWithWhereWithoutEntitiesInputObjectSchema as ActorUpdateToOneWithWhereWithoutEntitiesInputObjectSchema } from './ActorUpdateToOneWithWhereWithoutEntitiesInput.schema';
import { ActorUpdateWithoutEntitiesInputObjectSchema as ActorUpdateWithoutEntitiesInputObjectSchema } from './ActorUpdateWithoutEntitiesInput.schema';
import { ActorUncheckedUpdateWithoutEntitiesInputObjectSchema as ActorUncheckedUpdateWithoutEntitiesInputObjectSchema } from './ActorUncheckedUpdateWithoutEntitiesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ActorCreateWithoutEntitiesInputObjectSchema), z.lazy(() => ActorUncheckedCreateWithoutEntitiesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ActorCreateOrConnectWithoutEntitiesInputObjectSchema).optional(),
  upsert: z.lazy(() => ActorUpsertWithoutEntitiesInputObjectSchema).optional(),
  connect: z.lazy(() => ActorWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ActorUpdateToOneWithWhereWithoutEntitiesInputObjectSchema), z.lazy(() => ActorUpdateWithoutEntitiesInputObjectSchema), z.lazy(() => ActorUncheckedUpdateWithoutEntitiesInputObjectSchema)]).optional()
}).strict();
export const ActorUpdateOneRequiredWithoutEntitiesNestedInputObjectSchema: z.ZodType<Prisma.ActorUpdateOneRequiredWithoutEntitiesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorUpdateOneRequiredWithoutEntitiesNestedInput>;
export const ActorUpdateOneRequiredWithoutEntitiesNestedInputObjectZodSchema = makeSchema();
