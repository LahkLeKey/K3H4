import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerQueryCreateWithoutActorInputObjectSchema as MaptilerQueryCreateWithoutActorInputObjectSchema } from './MaptilerQueryCreateWithoutActorInput.schema';
import { MaptilerQueryUncheckedCreateWithoutActorInputObjectSchema as MaptilerQueryUncheckedCreateWithoutActorInputObjectSchema } from './MaptilerQueryUncheckedCreateWithoutActorInput.schema';
import { MaptilerQueryCreateOrConnectWithoutActorInputObjectSchema as MaptilerQueryCreateOrConnectWithoutActorInputObjectSchema } from './MaptilerQueryCreateOrConnectWithoutActorInput.schema';
import { MaptilerQueryUpsertWithWhereUniqueWithoutActorInputObjectSchema as MaptilerQueryUpsertWithWhereUniqueWithoutActorInputObjectSchema } from './MaptilerQueryUpsertWithWhereUniqueWithoutActorInput.schema';
import { MaptilerQueryCreateManyActorInputEnvelopeObjectSchema as MaptilerQueryCreateManyActorInputEnvelopeObjectSchema } from './MaptilerQueryCreateManyActorInputEnvelope.schema';
import { MaptilerQueryWhereUniqueInputObjectSchema as MaptilerQueryWhereUniqueInputObjectSchema } from './MaptilerQueryWhereUniqueInput.schema';
import { MaptilerQueryUpdateWithWhereUniqueWithoutActorInputObjectSchema as MaptilerQueryUpdateWithWhereUniqueWithoutActorInputObjectSchema } from './MaptilerQueryUpdateWithWhereUniqueWithoutActorInput.schema';
import { MaptilerQueryUpdateManyWithWhereWithoutActorInputObjectSchema as MaptilerQueryUpdateManyWithWhereWithoutActorInputObjectSchema } from './MaptilerQueryUpdateManyWithWhereWithoutActorInput.schema';
import { MaptilerQueryScalarWhereInputObjectSchema as MaptilerQueryScalarWhereInputObjectSchema } from './MaptilerQueryScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => MaptilerQueryCreateWithoutActorInputObjectSchema), z.lazy(() => MaptilerQueryCreateWithoutActorInputObjectSchema).array(), z.lazy(() => MaptilerQueryUncheckedCreateWithoutActorInputObjectSchema), z.lazy(() => MaptilerQueryUncheckedCreateWithoutActorInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => MaptilerQueryCreateOrConnectWithoutActorInputObjectSchema), z.lazy(() => MaptilerQueryCreateOrConnectWithoutActorInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => MaptilerQueryUpsertWithWhereUniqueWithoutActorInputObjectSchema), z.lazy(() => MaptilerQueryUpsertWithWhereUniqueWithoutActorInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => MaptilerQueryCreateManyActorInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => MaptilerQueryWhereUniqueInputObjectSchema), z.lazy(() => MaptilerQueryWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => MaptilerQueryWhereUniqueInputObjectSchema), z.lazy(() => MaptilerQueryWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => MaptilerQueryWhereUniqueInputObjectSchema), z.lazy(() => MaptilerQueryWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => MaptilerQueryWhereUniqueInputObjectSchema), z.lazy(() => MaptilerQueryWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => MaptilerQueryUpdateWithWhereUniqueWithoutActorInputObjectSchema), z.lazy(() => MaptilerQueryUpdateWithWhereUniqueWithoutActorInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => MaptilerQueryUpdateManyWithWhereWithoutActorInputObjectSchema), z.lazy(() => MaptilerQueryUpdateManyWithWhereWithoutActorInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => MaptilerQueryScalarWhereInputObjectSchema), z.lazy(() => MaptilerQueryScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const MaptilerQueryUpdateManyWithoutActorNestedInputObjectSchema: z.ZodType<Prisma.MaptilerQueryUpdateManyWithoutActorNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerQueryUpdateManyWithoutActorNestedInput>;
export const MaptilerQueryUpdateManyWithoutActorNestedInputObjectZodSchema = makeSchema();
