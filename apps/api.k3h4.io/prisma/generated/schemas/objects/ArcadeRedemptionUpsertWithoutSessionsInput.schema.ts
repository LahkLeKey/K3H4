import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeRedemptionUpdateWithoutSessionsInputObjectSchema as ArcadeRedemptionUpdateWithoutSessionsInputObjectSchema } from './ArcadeRedemptionUpdateWithoutSessionsInput.schema';
import { ArcadeRedemptionUncheckedUpdateWithoutSessionsInputObjectSchema as ArcadeRedemptionUncheckedUpdateWithoutSessionsInputObjectSchema } from './ArcadeRedemptionUncheckedUpdateWithoutSessionsInput.schema';
import { ArcadeRedemptionCreateWithoutSessionsInputObjectSchema as ArcadeRedemptionCreateWithoutSessionsInputObjectSchema } from './ArcadeRedemptionCreateWithoutSessionsInput.schema';
import { ArcadeRedemptionUncheckedCreateWithoutSessionsInputObjectSchema as ArcadeRedemptionUncheckedCreateWithoutSessionsInputObjectSchema } from './ArcadeRedemptionUncheckedCreateWithoutSessionsInput.schema';
import { ArcadeRedemptionWhereInputObjectSchema as ArcadeRedemptionWhereInputObjectSchema } from './ArcadeRedemptionWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ArcadeRedemptionUpdateWithoutSessionsInputObjectSchema), z.lazy(() => ArcadeRedemptionUncheckedUpdateWithoutSessionsInputObjectSchema)]),
  create: z.union([z.lazy(() => ArcadeRedemptionCreateWithoutSessionsInputObjectSchema), z.lazy(() => ArcadeRedemptionUncheckedCreateWithoutSessionsInputObjectSchema)]),
  where: z.lazy(() => ArcadeRedemptionWhereInputObjectSchema).optional()
}).strict();
export const ArcadeRedemptionUpsertWithoutSessionsInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionUpsertWithoutSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionUpsertWithoutSessionsInput>;
export const ArcadeRedemptionUpsertWithoutSessionsInputObjectZodSchema = makeSchema();
