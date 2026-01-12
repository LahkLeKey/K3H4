import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeTopUpCreateWithoutCardInputObjectSchema as ArcadeTopUpCreateWithoutCardInputObjectSchema } from './ArcadeTopUpCreateWithoutCardInput.schema';
import { ArcadeTopUpUncheckedCreateWithoutCardInputObjectSchema as ArcadeTopUpUncheckedCreateWithoutCardInputObjectSchema } from './ArcadeTopUpUncheckedCreateWithoutCardInput.schema';
import { ArcadeTopUpCreateOrConnectWithoutCardInputObjectSchema as ArcadeTopUpCreateOrConnectWithoutCardInputObjectSchema } from './ArcadeTopUpCreateOrConnectWithoutCardInput.schema';
import { ArcadeTopUpCreateManyCardInputEnvelopeObjectSchema as ArcadeTopUpCreateManyCardInputEnvelopeObjectSchema } from './ArcadeTopUpCreateManyCardInputEnvelope.schema';
import { ArcadeTopUpWhereUniqueInputObjectSchema as ArcadeTopUpWhereUniqueInputObjectSchema } from './ArcadeTopUpWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ArcadeTopUpCreateWithoutCardInputObjectSchema), z.lazy(() => ArcadeTopUpCreateWithoutCardInputObjectSchema).array(), z.lazy(() => ArcadeTopUpUncheckedCreateWithoutCardInputObjectSchema), z.lazy(() => ArcadeTopUpUncheckedCreateWithoutCardInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ArcadeTopUpCreateOrConnectWithoutCardInputObjectSchema), z.lazy(() => ArcadeTopUpCreateOrConnectWithoutCardInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ArcadeTopUpCreateManyCardInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ArcadeTopUpWhereUniqueInputObjectSchema), z.lazy(() => ArcadeTopUpWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ArcadeTopUpCreateNestedManyWithoutCardInputObjectSchema: z.ZodType<Prisma.ArcadeTopUpCreateNestedManyWithoutCardInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeTopUpCreateNestedManyWithoutCardInput>;
export const ArcadeTopUpCreateNestedManyWithoutCardInputObjectZodSchema = makeSchema();
