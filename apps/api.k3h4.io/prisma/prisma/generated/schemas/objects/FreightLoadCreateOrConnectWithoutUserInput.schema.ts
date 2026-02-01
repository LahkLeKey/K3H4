import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FreightLoadWhereUniqueInputObjectSchema as FreightLoadWhereUniqueInputObjectSchema } from './FreightLoadWhereUniqueInput.schema';
import { FreightLoadCreateWithoutUserInputObjectSchema as FreightLoadCreateWithoutUserInputObjectSchema } from './FreightLoadCreateWithoutUserInput.schema';
import { FreightLoadUncheckedCreateWithoutUserInputObjectSchema as FreightLoadUncheckedCreateWithoutUserInputObjectSchema } from './FreightLoadUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FreightLoadWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => FreightLoadCreateWithoutUserInputObjectSchema), z.lazy(() => FreightLoadUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const FreightLoadCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.FreightLoadCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.FreightLoadCreateOrConnectWithoutUserInput>;
export const FreightLoadCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
