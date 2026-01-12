import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureTaskWhereUniqueInputObjectSchema as AgricultureTaskWhereUniqueInputObjectSchema } from './AgricultureTaskWhereUniqueInput.schema';
import { AgricultureTaskCreateWithoutPlotInputObjectSchema as AgricultureTaskCreateWithoutPlotInputObjectSchema } from './AgricultureTaskCreateWithoutPlotInput.schema';
import { AgricultureTaskUncheckedCreateWithoutPlotInputObjectSchema as AgricultureTaskUncheckedCreateWithoutPlotInputObjectSchema } from './AgricultureTaskUncheckedCreateWithoutPlotInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureTaskWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AgricultureTaskCreateWithoutPlotInputObjectSchema), z.lazy(() => AgricultureTaskUncheckedCreateWithoutPlotInputObjectSchema)])
}).strict();
export const AgricultureTaskCreateOrConnectWithoutPlotInputObjectSchema: z.ZodType<Prisma.AgricultureTaskCreateOrConnectWithoutPlotInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureTaskCreateOrConnectWithoutPlotInput>;
export const AgricultureTaskCreateOrConnectWithoutPlotInputObjectZodSchema = makeSchema();
