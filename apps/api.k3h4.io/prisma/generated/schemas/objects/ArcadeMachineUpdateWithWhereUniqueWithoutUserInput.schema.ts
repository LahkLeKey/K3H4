import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeMachineWhereUniqueInputObjectSchema as ArcadeMachineWhereUniqueInputObjectSchema } from './ArcadeMachineWhereUniqueInput.schema';
import { ArcadeMachineUpdateWithoutUserInputObjectSchema as ArcadeMachineUpdateWithoutUserInputObjectSchema } from './ArcadeMachineUpdateWithoutUserInput.schema';
import { ArcadeMachineUncheckedUpdateWithoutUserInputObjectSchema as ArcadeMachineUncheckedUpdateWithoutUserInputObjectSchema } from './ArcadeMachineUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeMachineWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ArcadeMachineUpdateWithoutUserInputObjectSchema), z.lazy(() => ArcadeMachineUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const ArcadeMachineUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.ArcadeMachineUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeMachineUpdateWithWhereUniqueWithoutUserInput>;
export const ArcadeMachineUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
