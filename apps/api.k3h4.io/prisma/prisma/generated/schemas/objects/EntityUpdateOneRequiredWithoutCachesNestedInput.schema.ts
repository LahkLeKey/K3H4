import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityCreateWithoutCachesInputObjectSchema as EntityCreateWithoutCachesInputObjectSchema } from './EntityCreateWithoutCachesInput.schema';
import { EntityUncheckedCreateWithoutCachesInputObjectSchema as EntityUncheckedCreateWithoutCachesInputObjectSchema } from './EntityUncheckedCreateWithoutCachesInput.schema';
import { EntityCreateOrConnectWithoutCachesInputObjectSchema as EntityCreateOrConnectWithoutCachesInputObjectSchema } from './EntityCreateOrConnectWithoutCachesInput.schema';
import { EntityUpsertWithoutCachesInputObjectSchema as EntityUpsertWithoutCachesInputObjectSchema } from './EntityUpsertWithoutCachesInput.schema';
import { EntityWhereUniqueInputObjectSchema as EntityWhereUniqueInputObjectSchema } from './EntityWhereUniqueInput.schema';
import { EntityUpdateToOneWithWhereWithoutCachesInputObjectSchema as EntityUpdateToOneWithWhereWithoutCachesInputObjectSchema } from './EntityUpdateToOneWithWhereWithoutCachesInput.schema';
import { EntityUpdateWithoutCachesInputObjectSchema as EntityUpdateWithoutCachesInputObjectSchema } from './EntityUpdateWithoutCachesInput.schema';
import { EntityUncheckedUpdateWithoutCachesInputObjectSchema as EntityUncheckedUpdateWithoutCachesInputObjectSchema } from './EntityUncheckedUpdateWithoutCachesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => EntityCreateWithoutCachesInputObjectSchema), z.lazy(() => EntityUncheckedCreateWithoutCachesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => EntityCreateOrConnectWithoutCachesInputObjectSchema).optional(),
  upsert: z.lazy(() => EntityUpsertWithoutCachesInputObjectSchema).optional(),
  connect: z.lazy(() => EntityWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => EntityUpdateToOneWithWhereWithoutCachesInputObjectSchema), z.lazy(() => EntityUpdateWithoutCachesInputObjectSchema), z.lazy(() => EntityUncheckedUpdateWithoutCachesInputObjectSchema)]).optional()
}).strict();
export const EntityUpdateOneRequiredWithoutCachesNestedInputObjectSchema: z.ZodType<Prisma.EntityUpdateOneRequiredWithoutCachesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.EntityUpdateOneRequiredWithoutCachesNestedInput>;
export const EntityUpdateOneRequiredWithoutCachesNestedInputObjectZodSchema = makeSchema();
