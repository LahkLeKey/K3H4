import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeMachineScalarWhereInputObjectSchema as ArcadeMachineScalarWhereInputObjectSchema } from './ArcadeMachineScalarWhereInput.schema';
import { ArcadeMachineUpdateManyMutationInputObjectSchema as ArcadeMachineUpdateManyMutationInputObjectSchema } from './ArcadeMachineUpdateManyMutationInput.schema';
import { ArcadeMachineUncheckedUpdateManyWithoutUserInputObjectSchema as ArcadeMachineUncheckedUpdateManyWithoutUserInputObjectSchema } from './ArcadeMachineUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeMachineScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ArcadeMachineUpdateManyMutationInputObjectSchema), z.lazy(() => ArcadeMachineUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const ArcadeMachineUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.ArcadeMachineUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeMachineUpdateManyWithWhereWithoutUserInput>;
export const ArcadeMachineUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
