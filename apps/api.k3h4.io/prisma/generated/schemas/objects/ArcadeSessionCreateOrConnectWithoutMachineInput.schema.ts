import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeSessionWhereUniqueInputObjectSchema as ArcadeSessionWhereUniqueInputObjectSchema } from './ArcadeSessionWhereUniqueInput.schema';
import { ArcadeSessionCreateWithoutMachineInputObjectSchema as ArcadeSessionCreateWithoutMachineInputObjectSchema } from './ArcadeSessionCreateWithoutMachineInput.schema';
import { ArcadeSessionUncheckedCreateWithoutMachineInputObjectSchema as ArcadeSessionUncheckedCreateWithoutMachineInputObjectSchema } from './ArcadeSessionUncheckedCreateWithoutMachineInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ArcadeSessionCreateWithoutMachineInputObjectSchema), z.lazy(() => ArcadeSessionUncheckedCreateWithoutMachineInputObjectSchema)])
}).strict();
export const ArcadeSessionCreateOrConnectWithoutMachineInputObjectSchema: z.ZodType<Prisma.ArcadeSessionCreateOrConnectWithoutMachineInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionCreateOrConnectWithoutMachineInput>;
export const ArcadeSessionCreateOrConnectWithoutMachineInputObjectZodSchema = makeSchema();
