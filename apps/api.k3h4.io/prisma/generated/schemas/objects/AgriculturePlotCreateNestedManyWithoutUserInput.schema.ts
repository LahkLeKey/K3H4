import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotCreateWithoutUserInputObjectSchema as AgriculturePlotCreateWithoutUserInputObjectSchema } from './AgriculturePlotCreateWithoutUserInput.schema';
import { AgriculturePlotUncheckedCreateWithoutUserInputObjectSchema as AgriculturePlotUncheckedCreateWithoutUserInputObjectSchema } from './AgriculturePlotUncheckedCreateWithoutUserInput.schema';
import { AgriculturePlotCreateOrConnectWithoutUserInputObjectSchema as AgriculturePlotCreateOrConnectWithoutUserInputObjectSchema } from './AgriculturePlotCreateOrConnectWithoutUserInput.schema';
import { AgriculturePlotCreateManyUserInputEnvelopeObjectSchema as AgriculturePlotCreateManyUserInputEnvelopeObjectSchema } from './AgriculturePlotCreateManyUserInputEnvelope.schema';
import { AgriculturePlotWhereUniqueInputObjectSchema as AgriculturePlotWhereUniqueInputObjectSchema } from './AgriculturePlotWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgriculturePlotCreateWithoutUserInputObjectSchema), z.lazy(() => AgriculturePlotCreateWithoutUserInputObjectSchema).array(), z.lazy(() => AgriculturePlotUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => AgriculturePlotUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AgriculturePlotCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => AgriculturePlotCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AgriculturePlotCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => AgriculturePlotWhereUniqueInputObjectSchema), z.lazy(() => AgriculturePlotWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const AgriculturePlotCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.AgriculturePlotCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotCreateNestedManyWithoutUserInput>;
export const AgriculturePlotCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
