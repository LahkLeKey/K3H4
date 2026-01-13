import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeSessionCreateWithoutCardInputObjectSchema as ArcadeSessionCreateWithoutCardInputObjectSchema } from './ArcadeSessionCreateWithoutCardInput.schema';
import { ArcadeSessionUncheckedCreateWithoutCardInputObjectSchema as ArcadeSessionUncheckedCreateWithoutCardInputObjectSchema } from './ArcadeSessionUncheckedCreateWithoutCardInput.schema';
import { ArcadeSessionCreateOrConnectWithoutCardInputObjectSchema as ArcadeSessionCreateOrConnectWithoutCardInputObjectSchema } from './ArcadeSessionCreateOrConnectWithoutCardInput.schema';
import { ArcadeSessionCreateManyCardInputEnvelopeObjectSchema as ArcadeSessionCreateManyCardInputEnvelopeObjectSchema } from './ArcadeSessionCreateManyCardInputEnvelope.schema';
import { ArcadeSessionWhereUniqueInputObjectSchema as ArcadeSessionWhereUniqueInputObjectSchema } from './ArcadeSessionWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ArcadeSessionCreateWithoutCardInputObjectSchema), z.lazy(() => ArcadeSessionCreateWithoutCardInputObjectSchema).array(), z.lazy(() => ArcadeSessionUncheckedCreateWithoutCardInputObjectSchema), z.lazy(() => ArcadeSessionUncheckedCreateWithoutCardInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ArcadeSessionCreateOrConnectWithoutCardInputObjectSchema), z.lazy(() => ArcadeSessionCreateOrConnectWithoutCardInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ArcadeSessionCreateManyCardInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema), z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ArcadeSessionUncheckedCreateNestedManyWithoutCardInputObjectSchema: z.ZodType<Prisma.ArcadeSessionUncheckedCreateNestedManyWithoutCardInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionUncheckedCreateNestedManyWithoutCardInput>;
export const ArcadeSessionUncheckedCreateNestedManyWithoutCardInputObjectZodSchema = makeSchema();
