import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FreightLoadWhereUniqueInputObjectSchema as FreightLoadWhereUniqueInputObjectSchema } from './FreightLoadWhereUniqueInput.schema';
import { FreightLoadUpdateWithoutUserInputObjectSchema as FreightLoadUpdateWithoutUserInputObjectSchema } from './FreightLoadUpdateWithoutUserInput.schema';
import { FreightLoadUncheckedUpdateWithoutUserInputObjectSchema as FreightLoadUncheckedUpdateWithoutUserInputObjectSchema } from './FreightLoadUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FreightLoadWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => FreightLoadUpdateWithoutUserInputObjectSchema), z.lazy(() => FreightLoadUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const FreightLoadUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.FreightLoadUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.FreightLoadUpdateWithWhereUniqueWithoutUserInput>;
export const FreightLoadUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
