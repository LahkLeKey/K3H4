import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { ArcadeSessionCreateNestedManyWithoutMachineInputObjectSchema as ArcadeSessionCreateNestedManyWithoutMachineInputObjectSchema } from './ArcadeSessionCreateNestedManyWithoutMachineInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  gameTitle: z.string(),
  status: LifecycleStatusSchema.optional(),
  location: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  sessions: z.lazy(() => ArcadeSessionCreateNestedManyWithoutMachineInputObjectSchema).optional()
}).strict();
export const ArcadeMachineCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.ArcadeMachineCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeMachineCreateWithoutUserInput>;
export const ArcadeMachineCreateWithoutUserInputObjectZodSchema = makeSchema();
