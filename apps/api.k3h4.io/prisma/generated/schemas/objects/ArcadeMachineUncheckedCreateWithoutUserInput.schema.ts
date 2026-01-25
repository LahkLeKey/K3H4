import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { ArcadeSessionUncheckedCreateNestedManyWithoutMachineInputObjectSchema as ArcadeSessionUncheckedCreateNestedManyWithoutMachineInputObjectSchema } from './ArcadeSessionUncheckedCreateNestedManyWithoutMachineInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  gameTitle: z.string(),
  status: LifecycleStatusSchema.optional(),
  location: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  sessions: z.lazy(() => ArcadeSessionUncheckedCreateNestedManyWithoutMachineInputObjectSchema).optional()
}).strict();
export const ArcadeMachineUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.ArcadeMachineUncheckedCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeMachineUncheckedCreateWithoutUserInput>;
export const ArcadeMachineUncheckedCreateWithoutUserInputObjectZodSchema = makeSchema();
