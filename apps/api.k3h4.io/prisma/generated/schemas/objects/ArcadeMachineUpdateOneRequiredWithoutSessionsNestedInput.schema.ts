import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeMachineCreateWithoutSessionsInputObjectSchema as ArcadeMachineCreateWithoutSessionsInputObjectSchema } from './ArcadeMachineCreateWithoutSessionsInput.schema';
import { ArcadeMachineUncheckedCreateWithoutSessionsInputObjectSchema as ArcadeMachineUncheckedCreateWithoutSessionsInputObjectSchema } from './ArcadeMachineUncheckedCreateWithoutSessionsInput.schema';
import { ArcadeMachineCreateOrConnectWithoutSessionsInputObjectSchema as ArcadeMachineCreateOrConnectWithoutSessionsInputObjectSchema } from './ArcadeMachineCreateOrConnectWithoutSessionsInput.schema';
import { ArcadeMachineUpsertWithoutSessionsInputObjectSchema as ArcadeMachineUpsertWithoutSessionsInputObjectSchema } from './ArcadeMachineUpsertWithoutSessionsInput.schema';
import { ArcadeMachineWhereUniqueInputObjectSchema as ArcadeMachineWhereUniqueInputObjectSchema } from './ArcadeMachineWhereUniqueInput.schema';
import { ArcadeMachineUpdateToOneWithWhereWithoutSessionsInputObjectSchema as ArcadeMachineUpdateToOneWithWhereWithoutSessionsInputObjectSchema } from './ArcadeMachineUpdateToOneWithWhereWithoutSessionsInput.schema';
import { ArcadeMachineUpdateWithoutSessionsInputObjectSchema as ArcadeMachineUpdateWithoutSessionsInputObjectSchema } from './ArcadeMachineUpdateWithoutSessionsInput.schema';
import { ArcadeMachineUncheckedUpdateWithoutSessionsInputObjectSchema as ArcadeMachineUncheckedUpdateWithoutSessionsInputObjectSchema } from './ArcadeMachineUncheckedUpdateWithoutSessionsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ArcadeMachineCreateWithoutSessionsInputObjectSchema), z.lazy(() => ArcadeMachineUncheckedCreateWithoutSessionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ArcadeMachineCreateOrConnectWithoutSessionsInputObjectSchema).optional(),
  upsert: z.lazy(() => ArcadeMachineUpsertWithoutSessionsInputObjectSchema).optional(),
  connect: z.lazy(() => ArcadeMachineWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ArcadeMachineUpdateToOneWithWhereWithoutSessionsInputObjectSchema), z.lazy(() => ArcadeMachineUpdateWithoutSessionsInputObjectSchema), z.lazy(() => ArcadeMachineUncheckedUpdateWithoutSessionsInputObjectSchema)]).optional()
}).strict();
export const ArcadeMachineUpdateOneRequiredWithoutSessionsNestedInputObjectSchema: z.ZodType<Prisma.ArcadeMachineUpdateOneRequiredWithoutSessionsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeMachineUpdateOneRequiredWithoutSessionsNestedInput>;
export const ArcadeMachineUpdateOneRequiredWithoutSessionsNestedInputObjectZodSchema = makeSchema();
