import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeRedemptionCreateWithoutCardInputObjectSchema as ArcadeRedemptionCreateWithoutCardInputObjectSchema } from './ArcadeRedemptionCreateWithoutCardInput.schema';
import { ArcadeRedemptionUncheckedCreateWithoutCardInputObjectSchema as ArcadeRedemptionUncheckedCreateWithoutCardInputObjectSchema } from './ArcadeRedemptionUncheckedCreateWithoutCardInput.schema';
import { ArcadeRedemptionCreateOrConnectWithoutCardInputObjectSchema as ArcadeRedemptionCreateOrConnectWithoutCardInputObjectSchema } from './ArcadeRedemptionCreateOrConnectWithoutCardInput.schema';
import { ArcadeRedemptionUpsertWithWhereUniqueWithoutCardInputObjectSchema as ArcadeRedemptionUpsertWithWhereUniqueWithoutCardInputObjectSchema } from './ArcadeRedemptionUpsertWithWhereUniqueWithoutCardInput.schema';
import { ArcadeRedemptionCreateManyCardInputEnvelopeObjectSchema as ArcadeRedemptionCreateManyCardInputEnvelopeObjectSchema } from './ArcadeRedemptionCreateManyCardInputEnvelope.schema';
import { ArcadeRedemptionWhereUniqueInputObjectSchema as ArcadeRedemptionWhereUniqueInputObjectSchema } from './ArcadeRedemptionWhereUniqueInput.schema';
import { ArcadeRedemptionUpdateWithWhereUniqueWithoutCardInputObjectSchema as ArcadeRedemptionUpdateWithWhereUniqueWithoutCardInputObjectSchema } from './ArcadeRedemptionUpdateWithWhereUniqueWithoutCardInput.schema';
import { ArcadeRedemptionUpdateManyWithWhereWithoutCardInputObjectSchema as ArcadeRedemptionUpdateManyWithWhereWithoutCardInputObjectSchema } from './ArcadeRedemptionUpdateManyWithWhereWithoutCardInput.schema';
import { ArcadeRedemptionScalarWhereInputObjectSchema as ArcadeRedemptionScalarWhereInputObjectSchema } from './ArcadeRedemptionScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ArcadeRedemptionCreateWithoutCardInputObjectSchema), z.lazy(() => ArcadeRedemptionCreateWithoutCardInputObjectSchema).array(), z.lazy(() => ArcadeRedemptionUncheckedCreateWithoutCardInputObjectSchema), z.lazy(() => ArcadeRedemptionUncheckedCreateWithoutCardInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ArcadeRedemptionCreateOrConnectWithoutCardInputObjectSchema), z.lazy(() => ArcadeRedemptionCreateOrConnectWithoutCardInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ArcadeRedemptionUpsertWithWhereUniqueWithoutCardInputObjectSchema), z.lazy(() => ArcadeRedemptionUpsertWithWhereUniqueWithoutCardInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ArcadeRedemptionCreateManyCardInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema), z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema), z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema), z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema), z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ArcadeRedemptionUpdateWithWhereUniqueWithoutCardInputObjectSchema), z.lazy(() => ArcadeRedemptionUpdateWithWhereUniqueWithoutCardInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ArcadeRedemptionUpdateManyWithWhereWithoutCardInputObjectSchema), z.lazy(() => ArcadeRedemptionUpdateManyWithWhereWithoutCardInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ArcadeRedemptionScalarWhereInputObjectSchema), z.lazy(() => ArcadeRedemptionScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ArcadeRedemptionUpdateManyWithoutCardNestedInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionUpdateManyWithoutCardNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionUpdateManyWithoutCardNestedInput>;
export const ArcadeRedemptionUpdateManyWithoutCardNestedInputObjectZodSchema = makeSchema();
