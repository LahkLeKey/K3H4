import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerQueryWhereUniqueInputObjectSchema as MaptilerQueryWhereUniqueInputObjectSchema } from './MaptilerQueryWhereUniqueInput.schema';
import { MaptilerQueryCreateWithoutUserInputObjectSchema as MaptilerQueryCreateWithoutUserInputObjectSchema } from './MaptilerQueryCreateWithoutUserInput.schema';
import { MaptilerQueryUncheckedCreateWithoutUserInputObjectSchema as MaptilerQueryUncheckedCreateWithoutUserInputObjectSchema } from './MaptilerQueryUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MaptilerQueryWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => MaptilerQueryCreateWithoutUserInputObjectSchema), z.lazy(() => MaptilerQueryUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const MaptilerQueryCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.MaptilerQueryCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerQueryCreateOrConnectWithoutUserInput>;
export const MaptilerQueryCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
