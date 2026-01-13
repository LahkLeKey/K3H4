import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeSessionScalarWhereInputObjectSchema as ArcadeSessionScalarWhereInputObjectSchema } from './ArcadeSessionScalarWhereInput.schema';
import { ArcadeSessionUpdateManyMutationInputObjectSchema as ArcadeSessionUpdateManyMutationInputObjectSchema } from './ArcadeSessionUpdateManyMutationInput.schema';
import { ArcadeSessionUncheckedUpdateManyWithoutMachineInputObjectSchema as ArcadeSessionUncheckedUpdateManyWithoutMachineInputObjectSchema } from './ArcadeSessionUncheckedUpdateManyWithoutMachineInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeSessionScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ArcadeSessionUpdateManyMutationInputObjectSchema), z.lazy(() => ArcadeSessionUncheckedUpdateManyWithoutMachineInputObjectSchema)])
}).strict();
export const ArcadeSessionUpdateManyWithWhereWithoutMachineInputObjectSchema: z.ZodType<Prisma.ArcadeSessionUpdateManyWithWhereWithoutMachineInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionUpdateManyWithWhereWithoutMachineInput>;
export const ArcadeSessionUpdateManyWithWhereWithoutMachineInputObjectZodSchema = makeSchema();
