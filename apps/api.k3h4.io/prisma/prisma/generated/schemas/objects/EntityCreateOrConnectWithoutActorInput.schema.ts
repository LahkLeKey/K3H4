import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityWhereUniqueInputObjectSchema as EntityWhereUniqueInputObjectSchema } from './EntityWhereUniqueInput.schema';
import { EntityCreateWithoutActorInputObjectSchema as EntityCreateWithoutActorInputObjectSchema } from './EntityCreateWithoutActorInput.schema';
import { EntityUncheckedCreateWithoutActorInputObjectSchema as EntityUncheckedCreateWithoutActorInputObjectSchema } from './EntityUncheckedCreateWithoutActorInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => EntityWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => EntityCreateWithoutActorInputObjectSchema), z.lazy(() => EntityUncheckedCreateWithoutActorInputObjectSchema)])
}).strict();
export const EntityCreateOrConnectWithoutActorInputObjectSchema: z.ZodType<Prisma.EntityCreateOrConnectWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.EntityCreateOrConnectWithoutActorInput>;
export const EntityCreateOrConnectWithoutActorInputObjectZodSchema = makeSchema();
