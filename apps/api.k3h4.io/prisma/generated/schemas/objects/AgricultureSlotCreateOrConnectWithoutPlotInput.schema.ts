import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureSlotWhereUniqueInputObjectSchema as AgricultureSlotWhereUniqueInputObjectSchema } from './AgricultureSlotWhereUniqueInput.schema';
import { AgricultureSlotCreateWithoutPlotInputObjectSchema as AgricultureSlotCreateWithoutPlotInputObjectSchema } from './AgricultureSlotCreateWithoutPlotInput.schema';
import { AgricultureSlotUncheckedCreateWithoutPlotInputObjectSchema as AgricultureSlotUncheckedCreateWithoutPlotInputObjectSchema } from './AgricultureSlotUncheckedCreateWithoutPlotInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureSlotWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AgricultureSlotCreateWithoutPlotInputObjectSchema), z.lazy(() => AgricultureSlotUncheckedCreateWithoutPlotInputObjectSchema)])
}).strict();
export const AgricultureSlotCreateOrConnectWithoutPlotInputObjectSchema: z.ZodType<Prisma.AgricultureSlotCreateOrConnectWithoutPlotInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureSlotCreateOrConnectWithoutPlotInput>;
export const AgricultureSlotCreateOrConnectWithoutPlotInputObjectZodSchema = makeSchema();
