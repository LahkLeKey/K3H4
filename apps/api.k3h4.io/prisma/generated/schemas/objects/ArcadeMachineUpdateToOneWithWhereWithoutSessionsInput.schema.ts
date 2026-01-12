import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeMachineWhereInputObjectSchema as ArcadeMachineWhereInputObjectSchema } from './ArcadeMachineWhereInput.schema';
import { ArcadeMachineUpdateWithoutSessionsInputObjectSchema as ArcadeMachineUpdateWithoutSessionsInputObjectSchema } from './ArcadeMachineUpdateWithoutSessionsInput.schema';
import { ArcadeMachineUncheckedUpdateWithoutSessionsInputObjectSchema as ArcadeMachineUncheckedUpdateWithoutSessionsInputObjectSchema } from './ArcadeMachineUncheckedUpdateWithoutSessionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeMachineWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ArcadeMachineUpdateWithoutSessionsInputObjectSchema), z.lazy(() => ArcadeMachineUncheckedUpdateWithoutSessionsInputObjectSchema)])
}).strict();
export const ArcadeMachineUpdateToOneWithWhereWithoutSessionsInputObjectSchema: z.ZodType<Prisma.ArcadeMachineUpdateToOneWithWhereWithoutSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeMachineUpdateToOneWithWhereWithoutSessionsInput>;
export const ArcadeMachineUpdateToOneWithWhereWithoutSessionsInputObjectZodSchema = makeSchema();
