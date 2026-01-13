import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeMachineWhereUniqueInputObjectSchema as ArcadeMachineWhereUniqueInputObjectSchema } from './ArcadeMachineWhereUniqueInput.schema';
import { ArcadeMachineCreateWithoutSessionsInputObjectSchema as ArcadeMachineCreateWithoutSessionsInputObjectSchema } from './ArcadeMachineCreateWithoutSessionsInput.schema';
import { ArcadeMachineUncheckedCreateWithoutSessionsInputObjectSchema as ArcadeMachineUncheckedCreateWithoutSessionsInputObjectSchema } from './ArcadeMachineUncheckedCreateWithoutSessionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeMachineWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ArcadeMachineCreateWithoutSessionsInputObjectSchema), z.lazy(() => ArcadeMachineUncheckedCreateWithoutSessionsInputObjectSchema)])
}).strict();
export const ArcadeMachineCreateOrConnectWithoutSessionsInputObjectSchema: z.ZodType<Prisma.ArcadeMachineCreateOrConnectWithoutSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeMachineCreateOrConnectWithoutSessionsInput>;
export const ArcadeMachineCreateOrConnectWithoutSessionsInputObjectZodSchema = makeSchema();
