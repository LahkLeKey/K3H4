import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeMachineUpdateWithoutSessionsInputObjectSchema as ArcadeMachineUpdateWithoutSessionsInputObjectSchema } from './ArcadeMachineUpdateWithoutSessionsInput.schema';
import { ArcadeMachineUncheckedUpdateWithoutSessionsInputObjectSchema as ArcadeMachineUncheckedUpdateWithoutSessionsInputObjectSchema } from './ArcadeMachineUncheckedUpdateWithoutSessionsInput.schema';
import { ArcadeMachineCreateWithoutSessionsInputObjectSchema as ArcadeMachineCreateWithoutSessionsInputObjectSchema } from './ArcadeMachineCreateWithoutSessionsInput.schema';
import { ArcadeMachineUncheckedCreateWithoutSessionsInputObjectSchema as ArcadeMachineUncheckedCreateWithoutSessionsInputObjectSchema } from './ArcadeMachineUncheckedCreateWithoutSessionsInput.schema';
import { ArcadeMachineWhereInputObjectSchema as ArcadeMachineWhereInputObjectSchema } from './ArcadeMachineWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ArcadeMachineUpdateWithoutSessionsInputObjectSchema), z.lazy(() => ArcadeMachineUncheckedUpdateWithoutSessionsInputObjectSchema)]),
  create: z.union([z.lazy(() => ArcadeMachineCreateWithoutSessionsInputObjectSchema), z.lazy(() => ArcadeMachineUncheckedCreateWithoutSessionsInputObjectSchema)]),
  where: z.lazy(() => ArcadeMachineWhereInputObjectSchema).optional()
}).strict();
export const ArcadeMachineUpsertWithoutSessionsInputObjectSchema: z.ZodType<Prisma.ArcadeMachineUpsertWithoutSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeMachineUpsertWithoutSessionsInput>;
export const ArcadeMachineUpsertWithoutSessionsInputObjectZodSchema = makeSchema();
