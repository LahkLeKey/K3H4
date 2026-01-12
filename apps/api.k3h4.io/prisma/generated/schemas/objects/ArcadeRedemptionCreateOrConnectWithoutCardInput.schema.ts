import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeRedemptionWhereUniqueInputObjectSchema as ArcadeRedemptionWhereUniqueInputObjectSchema } from './ArcadeRedemptionWhereUniqueInput.schema';
import { ArcadeRedemptionCreateWithoutCardInputObjectSchema as ArcadeRedemptionCreateWithoutCardInputObjectSchema } from './ArcadeRedemptionCreateWithoutCardInput.schema';
import { ArcadeRedemptionUncheckedCreateWithoutCardInputObjectSchema as ArcadeRedemptionUncheckedCreateWithoutCardInputObjectSchema } from './ArcadeRedemptionUncheckedCreateWithoutCardInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ArcadeRedemptionCreateWithoutCardInputObjectSchema), z.lazy(() => ArcadeRedemptionUncheckedCreateWithoutCardInputObjectSchema)])
}).strict();
export const ArcadeRedemptionCreateOrConnectWithoutCardInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionCreateOrConnectWithoutCardInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionCreateOrConnectWithoutCardInput>;
export const ArcadeRedemptionCreateOrConnectWithoutCardInputObjectZodSchema = makeSchema();
