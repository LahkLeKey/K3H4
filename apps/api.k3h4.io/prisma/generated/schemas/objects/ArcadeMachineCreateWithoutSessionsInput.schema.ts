import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutArcadeMachinesInputObjectSchema as UserCreateNestedOneWithoutArcadeMachinesInputObjectSchema } from './UserCreateNestedOneWithoutArcadeMachinesInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  gameTitle: z.string(),
  status: z.string().optional(),
  location: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutArcadeMachinesInputObjectSchema)
}).strict();
export const ArcadeMachineCreateWithoutSessionsInputObjectSchema: z.ZodType<Prisma.ArcadeMachineCreateWithoutSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeMachineCreateWithoutSessionsInput>;
export const ArcadeMachineCreateWithoutSessionsInputObjectZodSchema = makeSchema();
