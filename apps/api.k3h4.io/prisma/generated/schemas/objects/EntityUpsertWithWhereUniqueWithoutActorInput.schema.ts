import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityWhereUniqueInputObjectSchema as EntityWhereUniqueInputObjectSchema } from './EntityWhereUniqueInput.schema';
import { EntityUpdateWithoutActorInputObjectSchema as EntityUpdateWithoutActorInputObjectSchema } from './EntityUpdateWithoutActorInput.schema';
import { EntityUncheckedUpdateWithoutActorInputObjectSchema as EntityUncheckedUpdateWithoutActorInputObjectSchema } from './EntityUncheckedUpdateWithoutActorInput.schema';
import { EntityCreateWithoutActorInputObjectSchema as EntityCreateWithoutActorInputObjectSchema } from './EntityCreateWithoutActorInput.schema';
import { EntityUncheckedCreateWithoutActorInputObjectSchema as EntityUncheckedCreateWithoutActorInputObjectSchema } from './EntityUncheckedCreateWithoutActorInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => EntityWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => EntityUpdateWithoutActorInputObjectSchema), z.lazy(() => EntityUncheckedUpdateWithoutActorInputObjectSchema)]),
  create: z.union([z.lazy(() => EntityCreateWithoutActorInputObjectSchema), z.lazy(() => EntityUncheckedCreateWithoutActorInputObjectSchema)])
}).strict();
export const EntityUpsertWithWhereUniqueWithoutActorInputObjectSchema: z.ZodType<Prisma.EntityUpsertWithWhereUniqueWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.EntityUpsertWithWhereUniqueWithoutActorInput>;
export const EntityUpsertWithWhereUniqueWithoutActorInputObjectZodSchema = makeSchema();
