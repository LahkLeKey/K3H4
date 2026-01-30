import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorUpdateWithoutEntitiesInputObjectSchema as ActorUpdateWithoutEntitiesInputObjectSchema } from './ActorUpdateWithoutEntitiesInput.schema';
import { ActorUncheckedUpdateWithoutEntitiesInputObjectSchema as ActorUncheckedUpdateWithoutEntitiesInputObjectSchema } from './ActorUncheckedUpdateWithoutEntitiesInput.schema';
import { ActorCreateWithoutEntitiesInputObjectSchema as ActorCreateWithoutEntitiesInputObjectSchema } from './ActorCreateWithoutEntitiesInput.schema';
import { ActorUncheckedCreateWithoutEntitiesInputObjectSchema as ActorUncheckedCreateWithoutEntitiesInputObjectSchema } from './ActorUncheckedCreateWithoutEntitiesInput.schema';
import { ActorWhereInputObjectSchema as ActorWhereInputObjectSchema } from './ActorWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ActorUpdateWithoutEntitiesInputObjectSchema), z.lazy(() => ActorUncheckedUpdateWithoutEntitiesInputObjectSchema)]),
  create: z.union([z.lazy(() => ActorCreateWithoutEntitiesInputObjectSchema), z.lazy(() => ActorUncheckedCreateWithoutEntitiesInputObjectSchema)]),
  where: z.lazy(() => ActorWhereInputObjectSchema).optional()
}).strict();
export const ActorUpsertWithoutEntitiesInputObjectSchema: z.ZodType<Prisma.ActorUpsertWithoutEntitiesInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorUpsertWithoutEntitiesInput>;
export const ActorUpsertWithoutEntitiesInputObjectZodSchema = makeSchema();
