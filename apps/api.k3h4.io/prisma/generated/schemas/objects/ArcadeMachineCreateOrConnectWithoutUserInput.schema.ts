import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeMachineWhereUniqueInputObjectSchema as ArcadeMachineWhereUniqueInputObjectSchema } from './ArcadeMachineWhereUniqueInput.schema';
import { ArcadeMachineCreateWithoutUserInputObjectSchema as ArcadeMachineCreateWithoutUserInputObjectSchema } from './ArcadeMachineCreateWithoutUserInput.schema';
import { ArcadeMachineUncheckedCreateWithoutUserInputObjectSchema as ArcadeMachineUncheckedCreateWithoutUserInputObjectSchema } from './ArcadeMachineUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeMachineWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ArcadeMachineCreateWithoutUserInputObjectSchema), z.lazy(() => ArcadeMachineUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const ArcadeMachineCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.ArcadeMachineCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeMachineCreateOrConnectWithoutUserInput>;
export const ArcadeMachineCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
