import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureTaskCreateWithoutPlotInputObjectSchema as AgricultureTaskCreateWithoutPlotInputObjectSchema } from './AgricultureTaskCreateWithoutPlotInput.schema';
import { AgricultureTaskUncheckedCreateWithoutPlotInputObjectSchema as AgricultureTaskUncheckedCreateWithoutPlotInputObjectSchema } from './AgricultureTaskUncheckedCreateWithoutPlotInput.schema';
import { AgricultureTaskCreateOrConnectWithoutPlotInputObjectSchema as AgricultureTaskCreateOrConnectWithoutPlotInputObjectSchema } from './AgricultureTaskCreateOrConnectWithoutPlotInput.schema';
import { AgricultureTaskUpsertWithWhereUniqueWithoutPlotInputObjectSchema as AgricultureTaskUpsertWithWhereUniqueWithoutPlotInputObjectSchema } from './AgricultureTaskUpsertWithWhereUniqueWithoutPlotInput.schema';
import { AgricultureTaskCreateManyPlotInputEnvelopeObjectSchema as AgricultureTaskCreateManyPlotInputEnvelopeObjectSchema } from './AgricultureTaskCreateManyPlotInputEnvelope.schema';
import { AgricultureTaskWhereUniqueInputObjectSchema as AgricultureTaskWhereUniqueInputObjectSchema } from './AgricultureTaskWhereUniqueInput.schema';
import { AgricultureTaskUpdateWithWhereUniqueWithoutPlotInputObjectSchema as AgricultureTaskUpdateWithWhereUniqueWithoutPlotInputObjectSchema } from './AgricultureTaskUpdateWithWhereUniqueWithoutPlotInput.schema';
import { AgricultureTaskUpdateManyWithWhereWithoutPlotInputObjectSchema as AgricultureTaskUpdateManyWithWhereWithoutPlotInputObjectSchema } from './AgricultureTaskUpdateManyWithWhereWithoutPlotInput.schema';
import { AgricultureTaskScalarWhereInputObjectSchema as AgricultureTaskScalarWhereInputObjectSchema } from './AgricultureTaskScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgricultureTaskCreateWithoutPlotInputObjectSchema), z.lazy(() => AgricultureTaskCreateWithoutPlotInputObjectSchema).array(), z.lazy(() => AgricultureTaskUncheckedCreateWithoutPlotInputObjectSchema), z.lazy(() => AgricultureTaskUncheckedCreateWithoutPlotInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AgricultureTaskCreateOrConnectWithoutPlotInputObjectSchema), z.lazy(() => AgricultureTaskCreateOrConnectWithoutPlotInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => AgricultureTaskUpsertWithWhereUniqueWithoutPlotInputObjectSchema), z.lazy(() => AgricultureTaskUpsertWithWhereUniqueWithoutPlotInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AgricultureTaskCreateManyPlotInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => AgricultureTaskWhereUniqueInputObjectSchema), z.lazy(() => AgricultureTaskWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => AgricultureTaskWhereUniqueInputObjectSchema), z.lazy(() => AgricultureTaskWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => AgricultureTaskWhereUniqueInputObjectSchema), z.lazy(() => AgricultureTaskWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => AgricultureTaskWhereUniqueInputObjectSchema), z.lazy(() => AgricultureTaskWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => AgricultureTaskUpdateWithWhereUniqueWithoutPlotInputObjectSchema), z.lazy(() => AgricultureTaskUpdateWithWhereUniqueWithoutPlotInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => AgricultureTaskUpdateManyWithWhereWithoutPlotInputObjectSchema), z.lazy(() => AgricultureTaskUpdateManyWithWhereWithoutPlotInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => AgricultureTaskScalarWhereInputObjectSchema), z.lazy(() => AgricultureTaskScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const AgricultureTaskUpdateManyWithoutPlotNestedInputObjectSchema: z.ZodType<Prisma.AgricultureTaskUpdateManyWithoutPlotNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureTaskUpdateManyWithoutPlotNestedInput>;
export const AgricultureTaskUpdateManyWithoutPlotNestedInputObjectZodSchema = makeSchema();
