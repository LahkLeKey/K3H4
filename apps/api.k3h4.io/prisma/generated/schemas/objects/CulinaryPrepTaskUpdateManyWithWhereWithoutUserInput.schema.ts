import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CulinaryPrepTaskScalarWhereInputObjectSchema as CulinaryPrepTaskScalarWhereInputObjectSchema } from './CulinaryPrepTaskScalarWhereInput.schema';
import { CulinaryPrepTaskUpdateManyMutationInputObjectSchema as CulinaryPrepTaskUpdateManyMutationInputObjectSchema } from './CulinaryPrepTaskUpdateManyMutationInput.schema';
import { CulinaryPrepTaskUncheckedUpdateManyWithoutUserInputObjectSchema as CulinaryPrepTaskUncheckedUpdateManyWithoutUserInputObjectSchema } from './CulinaryPrepTaskUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CulinaryPrepTaskScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CulinaryPrepTaskUpdateManyMutationInputObjectSchema), z.lazy(() => CulinaryPrepTaskUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const CulinaryPrepTaskUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.CulinaryPrepTaskUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryPrepTaskUpdateManyWithWhereWithoutUserInput>;
export const CulinaryPrepTaskUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
