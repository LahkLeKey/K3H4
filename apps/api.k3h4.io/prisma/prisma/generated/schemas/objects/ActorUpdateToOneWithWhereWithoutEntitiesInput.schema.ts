import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorWhereInputObjectSchema as ActorWhereInputObjectSchema } from './ActorWhereInput.schema';
import { ActorUpdateWithoutEntitiesInputObjectSchema as ActorUpdateWithoutEntitiesInputObjectSchema } from './ActorUpdateWithoutEntitiesInput.schema';
import { ActorUncheckedUpdateWithoutEntitiesInputObjectSchema as ActorUncheckedUpdateWithoutEntitiesInputObjectSchema } from './ActorUncheckedUpdateWithoutEntitiesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ActorWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ActorUpdateWithoutEntitiesInputObjectSchema), z.lazy(() => ActorUncheckedUpdateWithoutEntitiesInputObjectSchema)])
}).strict();
export const ActorUpdateToOneWithWhereWithoutEntitiesInputObjectSchema: z.ZodType<Prisma.ActorUpdateToOneWithWhereWithoutEntitiesInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorUpdateToOneWithWhereWithoutEntitiesInput>;
export const ActorUpdateToOneWithWhereWithoutEntitiesInputObjectZodSchema = makeSchema();
