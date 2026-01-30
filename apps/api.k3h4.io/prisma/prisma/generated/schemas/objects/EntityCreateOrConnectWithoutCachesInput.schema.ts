import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityWhereUniqueInputObjectSchema as EntityWhereUniqueInputObjectSchema } from './EntityWhereUniqueInput.schema';
import { EntityCreateWithoutCachesInputObjectSchema as EntityCreateWithoutCachesInputObjectSchema } from './EntityCreateWithoutCachesInput.schema';
import { EntityUncheckedCreateWithoutCachesInputObjectSchema as EntityUncheckedCreateWithoutCachesInputObjectSchema } from './EntityUncheckedCreateWithoutCachesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => EntityWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => EntityCreateWithoutCachesInputObjectSchema), z.lazy(() => EntityUncheckedCreateWithoutCachesInputObjectSchema)])
}).strict();
export const EntityCreateOrConnectWithoutCachesInputObjectSchema: z.ZodType<Prisma.EntityCreateOrConnectWithoutCachesInput> = makeSchema() as unknown as z.ZodType<Prisma.EntityCreateOrConnectWithoutCachesInput>;
export const EntityCreateOrConnectWithoutCachesInputObjectZodSchema = makeSchema();
