import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerQueryWhereUniqueInputObjectSchema as MaptilerQueryWhereUniqueInputObjectSchema } from './MaptilerQueryWhereUniqueInput.schema';
import { MaptilerQueryCreateWithoutActorInputObjectSchema as MaptilerQueryCreateWithoutActorInputObjectSchema } from './MaptilerQueryCreateWithoutActorInput.schema';
import { MaptilerQueryUncheckedCreateWithoutActorInputObjectSchema as MaptilerQueryUncheckedCreateWithoutActorInputObjectSchema } from './MaptilerQueryUncheckedCreateWithoutActorInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MaptilerQueryWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => MaptilerQueryCreateWithoutActorInputObjectSchema), z.lazy(() => MaptilerQueryUncheckedCreateWithoutActorInputObjectSchema)])
}).strict();
export const MaptilerQueryCreateOrConnectWithoutActorInputObjectSchema: z.ZodType<Prisma.MaptilerQueryCreateOrConnectWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerQueryCreateOrConnectWithoutActorInput>;
export const MaptilerQueryCreateOrConnectWithoutActorInputObjectZodSchema = makeSchema();
