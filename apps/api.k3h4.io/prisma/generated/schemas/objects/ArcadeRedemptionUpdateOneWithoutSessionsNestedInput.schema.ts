import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeRedemptionCreateWithoutSessionsInputObjectSchema as ArcadeRedemptionCreateWithoutSessionsInputObjectSchema } from './ArcadeRedemptionCreateWithoutSessionsInput.schema';
import { ArcadeRedemptionUncheckedCreateWithoutSessionsInputObjectSchema as ArcadeRedemptionUncheckedCreateWithoutSessionsInputObjectSchema } from './ArcadeRedemptionUncheckedCreateWithoutSessionsInput.schema';
import { ArcadeRedemptionCreateOrConnectWithoutSessionsInputObjectSchema as ArcadeRedemptionCreateOrConnectWithoutSessionsInputObjectSchema } from './ArcadeRedemptionCreateOrConnectWithoutSessionsInput.schema';
import { ArcadeRedemptionUpsertWithoutSessionsInputObjectSchema as ArcadeRedemptionUpsertWithoutSessionsInputObjectSchema } from './ArcadeRedemptionUpsertWithoutSessionsInput.schema';
import { ArcadeRedemptionWhereInputObjectSchema as ArcadeRedemptionWhereInputObjectSchema } from './ArcadeRedemptionWhereInput.schema';
import { ArcadeRedemptionWhereUniqueInputObjectSchema as ArcadeRedemptionWhereUniqueInputObjectSchema } from './ArcadeRedemptionWhereUniqueInput.schema';
import { ArcadeRedemptionUpdateToOneWithWhereWithoutSessionsInputObjectSchema as ArcadeRedemptionUpdateToOneWithWhereWithoutSessionsInputObjectSchema } from './ArcadeRedemptionUpdateToOneWithWhereWithoutSessionsInput.schema';
import { ArcadeRedemptionUpdateWithoutSessionsInputObjectSchema as ArcadeRedemptionUpdateWithoutSessionsInputObjectSchema } from './ArcadeRedemptionUpdateWithoutSessionsInput.schema';
import { ArcadeRedemptionUncheckedUpdateWithoutSessionsInputObjectSchema as ArcadeRedemptionUncheckedUpdateWithoutSessionsInputObjectSchema } from './ArcadeRedemptionUncheckedUpdateWithoutSessionsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ArcadeRedemptionCreateWithoutSessionsInputObjectSchema), z.lazy(() => ArcadeRedemptionUncheckedCreateWithoutSessionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ArcadeRedemptionCreateOrConnectWithoutSessionsInputObjectSchema).optional(),
  upsert: z.lazy(() => ArcadeRedemptionUpsertWithoutSessionsInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => ArcadeRedemptionWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => ArcadeRedemptionWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ArcadeRedemptionUpdateToOneWithWhereWithoutSessionsInputObjectSchema), z.lazy(() => ArcadeRedemptionUpdateWithoutSessionsInputObjectSchema), z.lazy(() => ArcadeRedemptionUncheckedUpdateWithoutSessionsInputObjectSchema)]).optional()
}).strict();
export const ArcadeRedemptionUpdateOneWithoutSessionsNestedInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionUpdateOneWithoutSessionsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionUpdateOneWithoutSessionsNestedInput>;
export const ArcadeRedemptionUpdateOneWithoutSessionsNestedInputObjectZodSchema = makeSchema();
