import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerQueryScalarWhereInputObjectSchema as MaptilerQueryScalarWhereInputObjectSchema } from './MaptilerQueryScalarWhereInput.schema';
import { MaptilerQueryUpdateManyMutationInputObjectSchema as MaptilerQueryUpdateManyMutationInputObjectSchema } from './MaptilerQueryUpdateManyMutationInput.schema';
import { MaptilerQueryUncheckedUpdateManyWithoutActorInputObjectSchema as MaptilerQueryUncheckedUpdateManyWithoutActorInputObjectSchema } from './MaptilerQueryUncheckedUpdateManyWithoutActorInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MaptilerQueryScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => MaptilerQueryUpdateManyMutationInputObjectSchema), z.lazy(() => MaptilerQueryUncheckedUpdateManyWithoutActorInputObjectSchema)])
}).strict();
export const MaptilerQueryUpdateManyWithWhereWithoutActorInputObjectSchema: z.ZodType<Prisma.MaptilerQueryUpdateManyWithWhereWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerQueryUpdateManyWithWhereWithoutActorInput>;
export const MaptilerQueryUpdateManyWithWhereWithoutActorInputObjectZodSchema = makeSchema();
