import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityCreateWithoutActorInputObjectSchema as EntityCreateWithoutActorInputObjectSchema } from './EntityCreateWithoutActorInput.schema';
import { EntityUncheckedCreateWithoutActorInputObjectSchema as EntityUncheckedCreateWithoutActorInputObjectSchema } from './EntityUncheckedCreateWithoutActorInput.schema';
import { EntityCreateOrConnectWithoutActorInputObjectSchema as EntityCreateOrConnectWithoutActorInputObjectSchema } from './EntityCreateOrConnectWithoutActorInput.schema';
import { EntityCreateManyActorInputEnvelopeObjectSchema as EntityCreateManyActorInputEnvelopeObjectSchema } from './EntityCreateManyActorInputEnvelope.schema';
import { EntityWhereUniqueInputObjectSchema as EntityWhereUniqueInputObjectSchema } from './EntityWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => EntityCreateWithoutActorInputObjectSchema), z.lazy(() => EntityCreateWithoutActorInputObjectSchema).array(), z.lazy(() => EntityUncheckedCreateWithoutActorInputObjectSchema), z.lazy(() => EntityUncheckedCreateWithoutActorInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => EntityCreateOrConnectWithoutActorInputObjectSchema), z.lazy(() => EntityCreateOrConnectWithoutActorInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => EntityCreateManyActorInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => EntityWhereUniqueInputObjectSchema), z.lazy(() => EntityWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const EntityCreateNestedManyWithoutActorInputObjectSchema: z.ZodType<Prisma.EntityCreateNestedManyWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.EntityCreateNestedManyWithoutActorInput>;
export const EntityCreateNestedManyWithoutActorInputObjectZodSchema = makeSchema();
