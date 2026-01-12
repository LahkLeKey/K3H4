import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeRedemptionCreateWithoutCardInputObjectSchema as ArcadeRedemptionCreateWithoutCardInputObjectSchema } from './ArcadeRedemptionCreateWithoutCardInput.schema';
import { ArcadeRedemptionUncheckedCreateWithoutCardInputObjectSchema as ArcadeRedemptionUncheckedCreateWithoutCardInputObjectSchema } from './ArcadeRedemptionUncheckedCreateWithoutCardInput.schema';
import { ArcadeRedemptionCreateOrConnectWithoutCardInputObjectSchema as ArcadeRedemptionCreateOrConnectWithoutCardInputObjectSchema } from './ArcadeRedemptionCreateOrConnectWithoutCardInput.schema';
import { ArcadeRedemptionCreateManyCardInputEnvelopeObjectSchema as ArcadeRedemptionCreateManyCardInputEnvelopeObjectSchema } from './ArcadeRedemptionCreateManyCardInputEnvelope.schema';
import { ArcadeRedemptionWhereUniqueInputObjectSchema as ArcadeRedemptionWhereUniqueInputObjectSchema } from './ArcadeRedemptionWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ArcadeRedemptionCreateWithoutCardInputObjectSchema), z.lazy(() => ArcadeRedemptionCreateWithoutCardInputObjectSchema).array(), z.lazy(() => ArcadeRedemptionUncheckedCreateWithoutCardInputObjectSchema), z.lazy(() => ArcadeRedemptionUncheckedCreateWithoutCardInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ArcadeRedemptionCreateOrConnectWithoutCardInputObjectSchema), z.lazy(() => ArcadeRedemptionCreateOrConnectWithoutCardInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ArcadeRedemptionCreateManyCardInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema), z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ArcadeRedemptionUncheckedCreateNestedManyWithoutCardInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionUncheckedCreateNestedManyWithoutCardInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionUncheckedCreateNestedManyWithoutCardInput>;
export const ArcadeRedemptionUncheckedCreateNestedManyWithoutCardInputObjectZodSchema = makeSchema();
