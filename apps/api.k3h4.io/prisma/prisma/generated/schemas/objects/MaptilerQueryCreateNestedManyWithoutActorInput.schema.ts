import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerQueryCreateWithoutActorInputObjectSchema as MaptilerQueryCreateWithoutActorInputObjectSchema } from './MaptilerQueryCreateWithoutActorInput.schema';
import { MaptilerQueryUncheckedCreateWithoutActorInputObjectSchema as MaptilerQueryUncheckedCreateWithoutActorInputObjectSchema } from './MaptilerQueryUncheckedCreateWithoutActorInput.schema';
import { MaptilerQueryCreateOrConnectWithoutActorInputObjectSchema as MaptilerQueryCreateOrConnectWithoutActorInputObjectSchema } from './MaptilerQueryCreateOrConnectWithoutActorInput.schema';
import { MaptilerQueryCreateManyActorInputEnvelopeObjectSchema as MaptilerQueryCreateManyActorInputEnvelopeObjectSchema } from './MaptilerQueryCreateManyActorInputEnvelope.schema';
import { MaptilerQueryWhereUniqueInputObjectSchema as MaptilerQueryWhereUniqueInputObjectSchema } from './MaptilerQueryWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => MaptilerQueryCreateWithoutActorInputObjectSchema), z.lazy(() => MaptilerQueryCreateWithoutActorInputObjectSchema).array(), z.lazy(() => MaptilerQueryUncheckedCreateWithoutActorInputObjectSchema), z.lazy(() => MaptilerQueryUncheckedCreateWithoutActorInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => MaptilerQueryCreateOrConnectWithoutActorInputObjectSchema), z.lazy(() => MaptilerQueryCreateOrConnectWithoutActorInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => MaptilerQueryCreateManyActorInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => MaptilerQueryWhereUniqueInputObjectSchema), z.lazy(() => MaptilerQueryWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const MaptilerQueryCreateNestedManyWithoutActorInputObjectSchema: z.ZodType<Prisma.MaptilerQueryCreateNestedManyWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerQueryCreateNestedManyWithoutActorInput>;
export const MaptilerQueryCreateNestedManyWithoutActorInputObjectZodSchema = makeSchema();
