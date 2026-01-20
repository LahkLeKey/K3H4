import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerQueryWhereUniqueInputObjectSchema as MaptilerQueryWhereUniqueInputObjectSchema } from './MaptilerQueryWhereUniqueInput.schema';
import { MaptilerQueryUpdateWithoutUserInputObjectSchema as MaptilerQueryUpdateWithoutUserInputObjectSchema } from './MaptilerQueryUpdateWithoutUserInput.schema';
import { MaptilerQueryUncheckedUpdateWithoutUserInputObjectSchema as MaptilerQueryUncheckedUpdateWithoutUserInputObjectSchema } from './MaptilerQueryUncheckedUpdateWithoutUserInput.schema';
import { MaptilerQueryCreateWithoutUserInputObjectSchema as MaptilerQueryCreateWithoutUserInputObjectSchema } from './MaptilerQueryCreateWithoutUserInput.schema';
import { MaptilerQueryUncheckedCreateWithoutUserInputObjectSchema as MaptilerQueryUncheckedCreateWithoutUserInputObjectSchema } from './MaptilerQueryUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MaptilerQueryWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => MaptilerQueryUpdateWithoutUserInputObjectSchema), z.lazy(() => MaptilerQueryUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => MaptilerQueryCreateWithoutUserInputObjectSchema), z.lazy(() => MaptilerQueryUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const MaptilerQueryUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.MaptilerQueryUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerQueryUpsertWithWhereUniqueWithoutUserInput>;
export const MaptilerQueryUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
