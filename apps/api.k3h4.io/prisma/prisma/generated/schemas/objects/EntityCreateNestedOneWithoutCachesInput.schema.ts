import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityCreateWithoutCachesInputObjectSchema as EntityCreateWithoutCachesInputObjectSchema } from './EntityCreateWithoutCachesInput.schema';
import { EntityUncheckedCreateWithoutCachesInputObjectSchema as EntityUncheckedCreateWithoutCachesInputObjectSchema } from './EntityUncheckedCreateWithoutCachesInput.schema';
import { EntityCreateOrConnectWithoutCachesInputObjectSchema as EntityCreateOrConnectWithoutCachesInputObjectSchema } from './EntityCreateOrConnectWithoutCachesInput.schema';
import { EntityWhereUniqueInputObjectSchema as EntityWhereUniqueInputObjectSchema } from './EntityWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => EntityCreateWithoutCachesInputObjectSchema), z.lazy(() => EntityUncheckedCreateWithoutCachesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => EntityCreateOrConnectWithoutCachesInputObjectSchema).optional(),
  connect: z.lazy(() => EntityWhereUniqueInputObjectSchema).optional()
}).strict();
export const EntityCreateNestedOneWithoutCachesInputObjectSchema: z.ZodType<Prisma.EntityCreateNestedOneWithoutCachesInput> = makeSchema() as unknown as z.ZodType<Prisma.EntityCreateNestedOneWithoutCachesInput>;
export const EntityCreateNestedOneWithoutCachesInputObjectZodSchema = makeSchema();
