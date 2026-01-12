import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureTaskCreateWithoutPlotInputObjectSchema as AgricultureTaskCreateWithoutPlotInputObjectSchema } from './AgricultureTaskCreateWithoutPlotInput.schema';
import { AgricultureTaskUncheckedCreateWithoutPlotInputObjectSchema as AgricultureTaskUncheckedCreateWithoutPlotInputObjectSchema } from './AgricultureTaskUncheckedCreateWithoutPlotInput.schema';
import { AgricultureTaskCreateOrConnectWithoutPlotInputObjectSchema as AgricultureTaskCreateOrConnectWithoutPlotInputObjectSchema } from './AgricultureTaskCreateOrConnectWithoutPlotInput.schema';
import { AgricultureTaskCreateManyPlotInputEnvelopeObjectSchema as AgricultureTaskCreateManyPlotInputEnvelopeObjectSchema } from './AgricultureTaskCreateManyPlotInputEnvelope.schema';
import { AgricultureTaskWhereUniqueInputObjectSchema as AgricultureTaskWhereUniqueInputObjectSchema } from './AgricultureTaskWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgricultureTaskCreateWithoutPlotInputObjectSchema), z.lazy(() => AgricultureTaskCreateWithoutPlotInputObjectSchema).array(), z.lazy(() => AgricultureTaskUncheckedCreateWithoutPlotInputObjectSchema), z.lazy(() => AgricultureTaskUncheckedCreateWithoutPlotInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AgricultureTaskCreateOrConnectWithoutPlotInputObjectSchema), z.lazy(() => AgricultureTaskCreateOrConnectWithoutPlotInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AgricultureTaskCreateManyPlotInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => AgricultureTaskWhereUniqueInputObjectSchema), z.lazy(() => AgricultureTaskWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const AgricultureTaskUncheckedCreateNestedManyWithoutPlotInputObjectSchema: z.ZodType<Prisma.AgricultureTaskUncheckedCreateNestedManyWithoutPlotInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureTaskUncheckedCreateNestedManyWithoutPlotInput>;
export const AgricultureTaskUncheckedCreateNestedManyWithoutPlotInputObjectZodSchema = makeSchema();
