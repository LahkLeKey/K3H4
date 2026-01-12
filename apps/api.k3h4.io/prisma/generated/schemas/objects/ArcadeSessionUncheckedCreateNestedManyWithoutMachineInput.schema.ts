import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeSessionCreateWithoutMachineInputObjectSchema as ArcadeSessionCreateWithoutMachineInputObjectSchema } from './ArcadeSessionCreateWithoutMachineInput.schema';
import { ArcadeSessionUncheckedCreateWithoutMachineInputObjectSchema as ArcadeSessionUncheckedCreateWithoutMachineInputObjectSchema } from './ArcadeSessionUncheckedCreateWithoutMachineInput.schema';
import { ArcadeSessionCreateOrConnectWithoutMachineInputObjectSchema as ArcadeSessionCreateOrConnectWithoutMachineInputObjectSchema } from './ArcadeSessionCreateOrConnectWithoutMachineInput.schema';
import { ArcadeSessionCreateManyMachineInputEnvelopeObjectSchema as ArcadeSessionCreateManyMachineInputEnvelopeObjectSchema } from './ArcadeSessionCreateManyMachineInputEnvelope.schema';
import { ArcadeSessionWhereUniqueInputObjectSchema as ArcadeSessionWhereUniqueInputObjectSchema } from './ArcadeSessionWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ArcadeSessionCreateWithoutMachineInputObjectSchema), z.lazy(() => ArcadeSessionCreateWithoutMachineInputObjectSchema).array(), z.lazy(() => ArcadeSessionUncheckedCreateWithoutMachineInputObjectSchema), z.lazy(() => ArcadeSessionUncheckedCreateWithoutMachineInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ArcadeSessionCreateOrConnectWithoutMachineInputObjectSchema), z.lazy(() => ArcadeSessionCreateOrConnectWithoutMachineInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ArcadeSessionCreateManyMachineInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema), z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ArcadeSessionUncheckedCreateNestedManyWithoutMachineInputObjectSchema: z.ZodType<Prisma.ArcadeSessionUncheckedCreateNestedManyWithoutMachineInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionUncheckedCreateNestedManyWithoutMachineInput>;
export const ArcadeSessionUncheckedCreateNestedManyWithoutMachineInputObjectZodSchema = makeSchema();
