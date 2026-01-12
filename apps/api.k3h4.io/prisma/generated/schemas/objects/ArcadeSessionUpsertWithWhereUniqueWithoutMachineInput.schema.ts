import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeSessionWhereUniqueInputObjectSchema as ArcadeSessionWhereUniqueInputObjectSchema } from './ArcadeSessionWhereUniqueInput.schema';
import { ArcadeSessionUpdateWithoutMachineInputObjectSchema as ArcadeSessionUpdateWithoutMachineInputObjectSchema } from './ArcadeSessionUpdateWithoutMachineInput.schema';
import { ArcadeSessionUncheckedUpdateWithoutMachineInputObjectSchema as ArcadeSessionUncheckedUpdateWithoutMachineInputObjectSchema } from './ArcadeSessionUncheckedUpdateWithoutMachineInput.schema';
import { ArcadeSessionCreateWithoutMachineInputObjectSchema as ArcadeSessionCreateWithoutMachineInputObjectSchema } from './ArcadeSessionCreateWithoutMachineInput.schema';
import { ArcadeSessionUncheckedCreateWithoutMachineInputObjectSchema as ArcadeSessionUncheckedCreateWithoutMachineInputObjectSchema } from './ArcadeSessionUncheckedCreateWithoutMachineInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ArcadeSessionUpdateWithoutMachineInputObjectSchema), z.lazy(() => ArcadeSessionUncheckedUpdateWithoutMachineInputObjectSchema)]),
  create: z.union([z.lazy(() => ArcadeSessionCreateWithoutMachineInputObjectSchema), z.lazy(() => ArcadeSessionUncheckedCreateWithoutMachineInputObjectSchema)])
}).strict();
export const ArcadeSessionUpsertWithWhereUniqueWithoutMachineInputObjectSchema: z.ZodType<Prisma.ArcadeSessionUpsertWithWhereUniqueWithoutMachineInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionUpsertWithWhereUniqueWithoutMachineInput>;
export const ArcadeSessionUpsertWithWhereUniqueWithoutMachineInputObjectZodSchema = makeSchema();
