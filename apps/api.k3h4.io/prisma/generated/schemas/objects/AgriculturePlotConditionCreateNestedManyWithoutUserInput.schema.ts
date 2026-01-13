import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotConditionCreateWithoutUserInputObjectSchema as AgriculturePlotConditionCreateWithoutUserInputObjectSchema } from './AgriculturePlotConditionCreateWithoutUserInput.schema';
import { AgriculturePlotConditionUncheckedCreateWithoutUserInputObjectSchema as AgriculturePlotConditionUncheckedCreateWithoutUserInputObjectSchema } from './AgriculturePlotConditionUncheckedCreateWithoutUserInput.schema';
import { AgriculturePlotConditionCreateOrConnectWithoutUserInputObjectSchema as AgriculturePlotConditionCreateOrConnectWithoutUserInputObjectSchema } from './AgriculturePlotConditionCreateOrConnectWithoutUserInput.schema';
import { AgriculturePlotConditionCreateManyUserInputEnvelopeObjectSchema as AgriculturePlotConditionCreateManyUserInputEnvelopeObjectSchema } from './AgriculturePlotConditionCreateManyUserInputEnvelope.schema';
import { AgriculturePlotConditionWhereUniqueInputObjectSchema as AgriculturePlotConditionWhereUniqueInputObjectSchema } from './AgriculturePlotConditionWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgriculturePlotConditionCreateWithoutUserInputObjectSchema), z.lazy(() => AgriculturePlotConditionCreateWithoutUserInputObjectSchema).array(), z.lazy(() => AgriculturePlotConditionUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => AgriculturePlotConditionUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AgriculturePlotConditionCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => AgriculturePlotConditionCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AgriculturePlotConditionCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => AgriculturePlotConditionWhereUniqueInputObjectSchema), z.lazy(() => AgriculturePlotConditionWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const AgriculturePlotConditionCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.AgriculturePlotConditionCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotConditionCreateNestedManyWithoutUserInput>;
export const AgriculturePlotConditionCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
