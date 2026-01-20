import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerQueryScalarWhereInputObjectSchema as MaptilerQueryScalarWhereInputObjectSchema } from './MaptilerQueryScalarWhereInput.schema';
import { MaptilerQueryUpdateManyMutationInputObjectSchema as MaptilerQueryUpdateManyMutationInputObjectSchema } from './MaptilerQueryUpdateManyMutationInput.schema';
import { MaptilerQueryUncheckedUpdateManyWithoutUserInputObjectSchema as MaptilerQueryUncheckedUpdateManyWithoutUserInputObjectSchema } from './MaptilerQueryUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MaptilerQueryScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => MaptilerQueryUpdateManyMutationInputObjectSchema), z.lazy(() => MaptilerQueryUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const MaptilerQueryUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.MaptilerQueryUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerQueryUpdateManyWithWhereWithoutUserInput>;
export const MaptilerQueryUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
