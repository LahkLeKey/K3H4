import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutCulinaryPrepTasksInputObjectSchema as UserCreateNestedOneWithoutCulinaryPrepTasksInputObjectSchema } from './UserCreateNestedOneWithoutCulinaryPrepTasksInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  task: z.string(),
  station: z.string(),
  dueAt: z.coerce.date().optional().nullable(),
  status: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCulinaryPrepTasksInputObjectSchema)
}).strict();
export const CulinaryPrepTaskCreateInputObjectSchema: z.ZodType<Prisma.CulinaryPrepTaskCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryPrepTaskCreateInput>;
export const CulinaryPrepTaskCreateInputObjectZodSchema = makeSchema();
