import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureSlotCreateWithoutPlotInputObjectSchema as AgricultureSlotCreateWithoutPlotInputObjectSchema } from './AgricultureSlotCreateWithoutPlotInput.schema';
import { AgricultureSlotUncheckedCreateWithoutPlotInputObjectSchema as AgricultureSlotUncheckedCreateWithoutPlotInputObjectSchema } from './AgricultureSlotUncheckedCreateWithoutPlotInput.schema';
import { AgricultureSlotCreateOrConnectWithoutPlotInputObjectSchema as AgricultureSlotCreateOrConnectWithoutPlotInputObjectSchema } from './AgricultureSlotCreateOrConnectWithoutPlotInput.schema';
import { AgricultureSlotCreateManyPlotInputEnvelopeObjectSchema as AgricultureSlotCreateManyPlotInputEnvelopeObjectSchema } from './AgricultureSlotCreateManyPlotInputEnvelope.schema';
import { AgricultureSlotWhereUniqueInputObjectSchema as AgricultureSlotWhereUniqueInputObjectSchema } from './AgricultureSlotWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgricultureSlotCreateWithoutPlotInputObjectSchema), z.lazy(() => AgricultureSlotCreateWithoutPlotInputObjectSchema).array(), z.lazy(() => AgricultureSlotUncheckedCreateWithoutPlotInputObjectSchema), z.lazy(() => AgricultureSlotUncheckedCreateWithoutPlotInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AgricultureSlotCreateOrConnectWithoutPlotInputObjectSchema), z.lazy(() => AgricultureSlotCreateOrConnectWithoutPlotInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AgricultureSlotCreateManyPlotInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => AgricultureSlotWhereUniqueInputObjectSchema), z.lazy(() => AgricultureSlotWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const AgricultureSlotUncheckedCreateNestedManyWithoutPlotInputObjectSchema: z.ZodType<Prisma.AgricultureSlotUncheckedCreateNestedManyWithoutPlotInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureSlotUncheckedCreateNestedManyWithoutPlotInput>;
export const AgricultureSlotUncheckedCreateNestedManyWithoutPlotInputObjectZodSchema = makeSchema();
