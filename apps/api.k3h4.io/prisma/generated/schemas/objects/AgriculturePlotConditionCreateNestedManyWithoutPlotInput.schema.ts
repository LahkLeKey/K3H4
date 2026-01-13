import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgriculturePlotConditionCreateWithoutPlotInputObjectSchema as AgriculturePlotConditionCreateWithoutPlotInputObjectSchema } from './AgriculturePlotConditionCreateWithoutPlotInput.schema';
import { AgriculturePlotConditionUncheckedCreateWithoutPlotInputObjectSchema as AgriculturePlotConditionUncheckedCreateWithoutPlotInputObjectSchema } from './AgriculturePlotConditionUncheckedCreateWithoutPlotInput.schema';
import { AgriculturePlotConditionCreateOrConnectWithoutPlotInputObjectSchema as AgriculturePlotConditionCreateOrConnectWithoutPlotInputObjectSchema } from './AgriculturePlotConditionCreateOrConnectWithoutPlotInput.schema';
import { AgriculturePlotConditionCreateManyPlotInputEnvelopeObjectSchema as AgriculturePlotConditionCreateManyPlotInputEnvelopeObjectSchema } from './AgriculturePlotConditionCreateManyPlotInputEnvelope.schema';
import { AgriculturePlotConditionWhereUniqueInputObjectSchema as AgriculturePlotConditionWhereUniqueInputObjectSchema } from './AgriculturePlotConditionWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgriculturePlotConditionCreateWithoutPlotInputObjectSchema), z.lazy(() => AgriculturePlotConditionCreateWithoutPlotInputObjectSchema).array(), z.lazy(() => AgriculturePlotConditionUncheckedCreateWithoutPlotInputObjectSchema), z.lazy(() => AgriculturePlotConditionUncheckedCreateWithoutPlotInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AgriculturePlotConditionCreateOrConnectWithoutPlotInputObjectSchema), z.lazy(() => AgriculturePlotConditionCreateOrConnectWithoutPlotInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AgriculturePlotConditionCreateManyPlotInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => AgriculturePlotConditionWhereUniqueInputObjectSchema), z.lazy(() => AgriculturePlotConditionWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const AgriculturePlotConditionCreateNestedManyWithoutPlotInputObjectSchema: z.ZodType<Prisma.AgriculturePlotConditionCreateNestedManyWithoutPlotInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotConditionCreateNestedManyWithoutPlotInput>;
export const AgriculturePlotConditionCreateNestedManyWithoutPlotInputObjectZodSchema = makeSchema();
