import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeMachineCreateWithoutSessionsInputObjectSchema as ArcadeMachineCreateWithoutSessionsInputObjectSchema } from './ArcadeMachineCreateWithoutSessionsInput.schema';
import { ArcadeMachineUncheckedCreateWithoutSessionsInputObjectSchema as ArcadeMachineUncheckedCreateWithoutSessionsInputObjectSchema } from './ArcadeMachineUncheckedCreateWithoutSessionsInput.schema';
import { ArcadeMachineCreateOrConnectWithoutSessionsInputObjectSchema as ArcadeMachineCreateOrConnectWithoutSessionsInputObjectSchema } from './ArcadeMachineCreateOrConnectWithoutSessionsInput.schema';
import { ArcadeMachineWhereUniqueInputObjectSchema as ArcadeMachineWhereUniqueInputObjectSchema } from './ArcadeMachineWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ArcadeMachineCreateWithoutSessionsInputObjectSchema), z.lazy(() => ArcadeMachineUncheckedCreateWithoutSessionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ArcadeMachineCreateOrConnectWithoutSessionsInputObjectSchema).optional(),
  connect: z.lazy(() => ArcadeMachineWhereUniqueInputObjectSchema).optional()
}).strict();
export const ArcadeMachineCreateNestedOneWithoutSessionsInputObjectSchema: z.ZodType<Prisma.ArcadeMachineCreateNestedOneWithoutSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeMachineCreateNestedOneWithoutSessionsInput>;
export const ArcadeMachineCreateNestedOneWithoutSessionsInputObjectZodSchema = makeSchema();
