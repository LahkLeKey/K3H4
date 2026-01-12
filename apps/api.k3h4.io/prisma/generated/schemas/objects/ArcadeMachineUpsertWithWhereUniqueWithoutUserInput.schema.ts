import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeMachineWhereUniqueInputObjectSchema as ArcadeMachineWhereUniqueInputObjectSchema } from './ArcadeMachineWhereUniqueInput.schema';
import { ArcadeMachineUpdateWithoutUserInputObjectSchema as ArcadeMachineUpdateWithoutUserInputObjectSchema } from './ArcadeMachineUpdateWithoutUserInput.schema';
import { ArcadeMachineUncheckedUpdateWithoutUserInputObjectSchema as ArcadeMachineUncheckedUpdateWithoutUserInputObjectSchema } from './ArcadeMachineUncheckedUpdateWithoutUserInput.schema';
import { ArcadeMachineCreateWithoutUserInputObjectSchema as ArcadeMachineCreateWithoutUserInputObjectSchema } from './ArcadeMachineCreateWithoutUserInput.schema';
import { ArcadeMachineUncheckedCreateWithoutUserInputObjectSchema as ArcadeMachineUncheckedCreateWithoutUserInputObjectSchema } from './ArcadeMachineUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeMachineWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ArcadeMachineUpdateWithoutUserInputObjectSchema), z.lazy(() => ArcadeMachineUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => ArcadeMachineCreateWithoutUserInputObjectSchema), z.lazy(() => ArcadeMachineUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const ArcadeMachineUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.ArcadeMachineUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeMachineUpsertWithWhereUniqueWithoutUserInput>;
export const ArcadeMachineUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
