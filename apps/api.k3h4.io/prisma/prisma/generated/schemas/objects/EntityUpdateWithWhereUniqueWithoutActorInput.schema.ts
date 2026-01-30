import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityWhereUniqueInputObjectSchema as EntityWhereUniqueInputObjectSchema } from './EntityWhereUniqueInput.schema';
import { EntityUpdateWithoutActorInputObjectSchema as EntityUpdateWithoutActorInputObjectSchema } from './EntityUpdateWithoutActorInput.schema';
import { EntityUncheckedUpdateWithoutActorInputObjectSchema as EntityUncheckedUpdateWithoutActorInputObjectSchema } from './EntityUncheckedUpdateWithoutActorInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => EntityWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => EntityUpdateWithoutActorInputObjectSchema), z.lazy(() => EntityUncheckedUpdateWithoutActorInputObjectSchema)])
}).strict();
export const EntityUpdateWithWhereUniqueWithoutActorInputObjectSchema: z.ZodType<Prisma.EntityUpdateWithWhereUniqueWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.EntityUpdateWithWhereUniqueWithoutActorInput>;
export const EntityUpdateWithWhereUniqueWithoutActorInputObjectZodSchema = makeSchema();
