import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityScalarWhereInputObjectSchema as EntityScalarWhereInputObjectSchema } from './EntityScalarWhereInput.schema';
import { EntityUpdateManyMutationInputObjectSchema as EntityUpdateManyMutationInputObjectSchema } from './EntityUpdateManyMutationInput.schema';
import { EntityUncheckedUpdateManyWithoutActorInputObjectSchema as EntityUncheckedUpdateManyWithoutActorInputObjectSchema } from './EntityUncheckedUpdateManyWithoutActorInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => EntityScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => EntityUpdateManyMutationInputObjectSchema), z.lazy(() => EntityUncheckedUpdateManyWithoutActorInputObjectSchema)])
}).strict();
export const EntityUpdateManyWithWhereWithoutActorInputObjectSchema: z.ZodType<Prisma.EntityUpdateManyWithWhereWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.EntityUpdateManyWithWhereWithoutActorInput>;
export const EntityUpdateManyWithWhereWithoutActorInputObjectZodSchema = makeSchema();
