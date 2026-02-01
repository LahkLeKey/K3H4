import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityWhereInputObjectSchema as EntityWhereInputObjectSchema } from './EntityWhereInput.schema';
import { EntityUpdateWithoutCachesInputObjectSchema as EntityUpdateWithoutCachesInputObjectSchema } from './EntityUpdateWithoutCachesInput.schema';
import { EntityUncheckedUpdateWithoutCachesInputObjectSchema as EntityUncheckedUpdateWithoutCachesInputObjectSchema } from './EntityUncheckedUpdateWithoutCachesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => EntityWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => EntityUpdateWithoutCachesInputObjectSchema), z.lazy(() => EntityUncheckedUpdateWithoutCachesInputObjectSchema)])
}).strict();
export const EntityUpdateToOneWithWhereWithoutCachesInputObjectSchema: z.ZodType<Prisma.EntityUpdateToOneWithWhereWithoutCachesInput> = makeSchema() as unknown as z.ZodType<Prisma.EntityUpdateToOneWithWhereWithoutCachesInput>;
export const EntityUpdateToOneWithWhereWithoutCachesInputObjectZodSchema = makeSchema();
