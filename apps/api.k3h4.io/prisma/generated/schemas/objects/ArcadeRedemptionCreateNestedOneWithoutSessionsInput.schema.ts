import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeRedemptionCreateWithoutSessionsInputObjectSchema as ArcadeRedemptionCreateWithoutSessionsInputObjectSchema } from './ArcadeRedemptionCreateWithoutSessionsInput.schema';
import { ArcadeRedemptionUncheckedCreateWithoutSessionsInputObjectSchema as ArcadeRedemptionUncheckedCreateWithoutSessionsInputObjectSchema } from './ArcadeRedemptionUncheckedCreateWithoutSessionsInput.schema';
import { ArcadeRedemptionCreateOrConnectWithoutSessionsInputObjectSchema as ArcadeRedemptionCreateOrConnectWithoutSessionsInputObjectSchema } from './ArcadeRedemptionCreateOrConnectWithoutSessionsInput.schema';
import { ArcadeRedemptionWhereUniqueInputObjectSchema as ArcadeRedemptionWhereUniqueInputObjectSchema } from './ArcadeRedemptionWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ArcadeRedemptionCreateWithoutSessionsInputObjectSchema), z.lazy(() => ArcadeRedemptionUncheckedCreateWithoutSessionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ArcadeRedemptionCreateOrConnectWithoutSessionsInputObjectSchema).optional(),
  connect: z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema).optional()
}).strict();
export const ArcadeRedemptionCreateNestedOneWithoutSessionsInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionCreateNestedOneWithoutSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionCreateNestedOneWithoutSessionsInput>;
export const ArcadeRedemptionCreateNestedOneWithoutSessionsInputObjectZodSchema = makeSchema();
