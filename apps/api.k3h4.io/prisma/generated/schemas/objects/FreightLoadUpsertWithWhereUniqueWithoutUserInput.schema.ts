import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FreightLoadWhereUniqueInputObjectSchema as FreightLoadWhereUniqueInputObjectSchema } from './FreightLoadWhereUniqueInput.schema';
import { FreightLoadUpdateWithoutUserInputObjectSchema as FreightLoadUpdateWithoutUserInputObjectSchema } from './FreightLoadUpdateWithoutUserInput.schema';
import { FreightLoadUncheckedUpdateWithoutUserInputObjectSchema as FreightLoadUncheckedUpdateWithoutUserInputObjectSchema } from './FreightLoadUncheckedUpdateWithoutUserInput.schema';
import { FreightLoadCreateWithoutUserInputObjectSchema as FreightLoadCreateWithoutUserInputObjectSchema } from './FreightLoadCreateWithoutUserInput.schema';
import { FreightLoadUncheckedCreateWithoutUserInputObjectSchema as FreightLoadUncheckedCreateWithoutUserInputObjectSchema } from './FreightLoadUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FreightLoadWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => FreightLoadUpdateWithoutUserInputObjectSchema), z.lazy(() => FreightLoadUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => FreightLoadCreateWithoutUserInputObjectSchema), z.lazy(() => FreightLoadUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const FreightLoadUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.FreightLoadUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.FreightLoadUpsertWithWhereUniqueWithoutUserInput>;
export const FreightLoadUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
