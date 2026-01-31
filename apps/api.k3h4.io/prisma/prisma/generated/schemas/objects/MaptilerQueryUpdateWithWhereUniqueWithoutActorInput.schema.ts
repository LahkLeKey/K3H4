import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerQueryWhereUniqueInputObjectSchema as MaptilerQueryWhereUniqueInputObjectSchema } from './MaptilerQueryWhereUniqueInput.schema';
import { MaptilerQueryUpdateWithoutActorInputObjectSchema as MaptilerQueryUpdateWithoutActorInputObjectSchema } from './MaptilerQueryUpdateWithoutActorInput.schema';
import { MaptilerQueryUncheckedUpdateWithoutActorInputObjectSchema as MaptilerQueryUncheckedUpdateWithoutActorInputObjectSchema } from './MaptilerQueryUncheckedUpdateWithoutActorInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MaptilerQueryWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => MaptilerQueryUpdateWithoutActorInputObjectSchema), z.lazy(() => MaptilerQueryUncheckedUpdateWithoutActorInputObjectSchema)])
}).strict();
export const MaptilerQueryUpdateWithWhereUniqueWithoutActorInputObjectSchema: z.ZodType<Prisma.MaptilerQueryUpdateWithWhereUniqueWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerQueryUpdateWithWhereUniqueWithoutActorInput>;
export const MaptilerQueryUpdateWithWhereUniqueWithoutActorInputObjectZodSchema = makeSchema();
