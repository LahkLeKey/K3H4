import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorWhereInputObjectSchema as ActorWhereInputObjectSchema } from './ActorWhereInput.schema';
import { ActorUpdateWithoutCachesInputObjectSchema as ActorUpdateWithoutCachesInputObjectSchema } from './ActorUpdateWithoutCachesInput.schema';
import { ActorUncheckedUpdateWithoutCachesInputObjectSchema as ActorUncheckedUpdateWithoutCachesInputObjectSchema } from './ActorUncheckedUpdateWithoutCachesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ActorWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ActorUpdateWithoutCachesInputObjectSchema), z.lazy(() => ActorUncheckedUpdateWithoutCachesInputObjectSchema)])
}).strict();
export const ActorUpdateToOneWithWhereWithoutCachesInputObjectSchema: z.ZodType<Prisma.ActorUpdateToOneWithWhereWithoutCachesInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorUpdateToOneWithWhereWithoutCachesInput>;
export const ActorUpdateToOneWithWhereWithoutCachesInputObjectZodSchema = makeSchema();
