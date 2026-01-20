import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerQueryWhereUniqueInputObjectSchema as MaptilerQueryWhereUniqueInputObjectSchema } from './MaptilerQueryWhereUniqueInput.schema';
import { MaptilerQueryUpdateWithoutUserInputObjectSchema as MaptilerQueryUpdateWithoutUserInputObjectSchema } from './MaptilerQueryUpdateWithoutUserInput.schema';
import { MaptilerQueryUncheckedUpdateWithoutUserInputObjectSchema as MaptilerQueryUncheckedUpdateWithoutUserInputObjectSchema } from './MaptilerQueryUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MaptilerQueryWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => MaptilerQueryUpdateWithoutUserInputObjectSchema), z.lazy(() => MaptilerQueryUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const MaptilerQueryUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.MaptilerQueryUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerQueryUpdateWithWhereUniqueWithoutUserInput>;
export const MaptilerQueryUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
