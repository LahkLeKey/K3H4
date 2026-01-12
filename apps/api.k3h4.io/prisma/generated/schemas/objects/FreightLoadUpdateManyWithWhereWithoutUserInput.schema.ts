import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FreightLoadScalarWhereInputObjectSchema as FreightLoadScalarWhereInputObjectSchema } from './FreightLoadScalarWhereInput.schema';
import { FreightLoadUpdateManyMutationInputObjectSchema as FreightLoadUpdateManyMutationInputObjectSchema } from './FreightLoadUpdateManyMutationInput.schema';
import { FreightLoadUncheckedUpdateManyWithoutUserInputObjectSchema as FreightLoadUncheckedUpdateManyWithoutUserInputObjectSchema } from './FreightLoadUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FreightLoadScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => FreightLoadUpdateManyMutationInputObjectSchema), z.lazy(() => FreightLoadUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const FreightLoadUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.FreightLoadUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.FreightLoadUpdateManyWithWhereWithoutUserInput>;
export const FreightLoadUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
