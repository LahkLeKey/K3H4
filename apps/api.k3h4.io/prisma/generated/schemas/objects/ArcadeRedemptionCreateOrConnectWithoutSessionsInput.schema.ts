import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeRedemptionWhereUniqueInputObjectSchema as ArcadeRedemptionWhereUniqueInputObjectSchema } from './ArcadeRedemptionWhereUniqueInput.schema';
import { ArcadeRedemptionCreateWithoutSessionsInputObjectSchema as ArcadeRedemptionCreateWithoutSessionsInputObjectSchema } from './ArcadeRedemptionCreateWithoutSessionsInput.schema';
import { ArcadeRedemptionUncheckedCreateWithoutSessionsInputObjectSchema as ArcadeRedemptionUncheckedCreateWithoutSessionsInputObjectSchema } from './ArcadeRedemptionUncheckedCreateWithoutSessionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ArcadeRedemptionCreateWithoutSessionsInputObjectSchema), z.lazy(() => ArcadeRedemptionUncheckedCreateWithoutSessionsInputObjectSchema)])
}).strict();
export const ArcadeRedemptionCreateOrConnectWithoutSessionsInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionCreateOrConnectWithoutSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionCreateOrConnectWithoutSessionsInput>;
export const ArcadeRedemptionCreateOrConnectWithoutSessionsInputObjectZodSchema = makeSchema();
