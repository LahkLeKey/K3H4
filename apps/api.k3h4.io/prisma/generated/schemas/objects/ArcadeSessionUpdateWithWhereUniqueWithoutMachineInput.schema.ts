import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeSessionWhereUniqueInputObjectSchema as ArcadeSessionWhereUniqueInputObjectSchema } from './ArcadeSessionWhereUniqueInput.schema';
import { ArcadeSessionUpdateWithoutMachineInputObjectSchema as ArcadeSessionUpdateWithoutMachineInputObjectSchema } from './ArcadeSessionUpdateWithoutMachineInput.schema';
import { ArcadeSessionUncheckedUpdateWithoutMachineInputObjectSchema as ArcadeSessionUncheckedUpdateWithoutMachineInputObjectSchema } from './ArcadeSessionUncheckedUpdateWithoutMachineInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ArcadeSessionUpdateWithoutMachineInputObjectSchema), z.lazy(() => ArcadeSessionUncheckedUpdateWithoutMachineInputObjectSchema)])
}).strict();
export const ArcadeSessionUpdateWithWhereUniqueWithoutMachineInputObjectSchema: z.ZodType<Prisma.ArcadeSessionUpdateWithWhereUniqueWithoutMachineInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionUpdateWithWhereUniqueWithoutMachineInput>;
export const ArcadeSessionUpdateWithWhereUniqueWithoutMachineInputObjectZodSchema = makeSchema();
