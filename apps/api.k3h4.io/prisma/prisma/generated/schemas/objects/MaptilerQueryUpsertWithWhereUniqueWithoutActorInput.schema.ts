import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerQueryWhereUniqueInputObjectSchema as MaptilerQueryWhereUniqueInputObjectSchema } from './MaptilerQueryWhereUniqueInput.schema';
import { MaptilerQueryUpdateWithoutActorInputObjectSchema as MaptilerQueryUpdateWithoutActorInputObjectSchema } from './MaptilerQueryUpdateWithoutActorInput.schema';
import { MaptilerQueryUncheckedUpdateWithoutActorInputObjectSchema as MaptilerQueryUncheckedUpdateWithoutActorInputObjectSchema } from './MaptilerQueryUncheckedUpdateWithoutActorInput.schema';
import { MaptilerQueryCreateWithoutActorInputObjectSchema as MaptilerQueryCreateWithoutActorInputObjectSchema } from './MaptilerQueryCreateWithoutActorInput.schema';
import { MaptilerQueryUncheckedCreateWithoutActorInputObjectSchema as MaptilerQueryUncheckedCreateWithoutActorInputObjectSchema } from './MaptilerQueryUncheckedCreateWithoutActorInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MaptilerQueryWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => MaptilerQueryUpdateWithoutActorInputObjectSchema), z.lazy(() => MaptilerQueryUncheckedUpdateWithoutActorInputObjectSchema)]),
  create: z.union([z.lazy(() => MaptilerQueryCreateWithoutActorInputObjectSchema), z.lazy(() => MaptilerQueryUncheckedCreateWithoutActorInputObjectSchema)])
}).strict();
export const MaptilerQueryUpsertWithWhereUniqueWithoutActorInputObjectSchema: z.ZodType<Prisma.MaptilerQueryUpsertWithWhereUniqueWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerQueryUpsertWithWhereUniqueWithoutActorInput>;
export const MaptilerQueryUpsertWithWhereUniqueWithoutActorInputObjectZodSchema = makeSchema();
