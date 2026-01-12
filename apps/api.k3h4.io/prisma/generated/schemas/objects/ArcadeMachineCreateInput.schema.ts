import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutArcadeMachinesInputObjectSchema as UserCreateNestedOneWithoutArcadeMachinesInputObjectSchema } from './UserCreateNestedOneWithoutArcadeMachinesInput.schema';
import { ArcadeSessionCreateNestedManyWithoutMachineInputObjectSchema as ArcadeSessionCreateNestedManyWithoutMachineInputObjectSchema } from './ArcadeSessionCreateNestedManyWithoutMachineInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  gameTitle: z.string(),
  status: z.string().optional(),
  location: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutArcadeMachinesInputObjectSchema),
  sessions: z.lazy(() => ArcadeSessionCreateNestedManyWithoutMachineInputObjectSchema).optional()
}).strict();
export const ArcadeMachineCreateInputObjectSchema: z.ZodType<Prisma.ArcadeMachineCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeMachineCreateInput>;
export const ArcadeMachineCreateInputObjectZodSchema = makeSchema();
