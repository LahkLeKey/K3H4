import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeCardCreateWithoutRedemptionsInputObjectSchema as ArcadeCardCreateWithoutRedemptionsInputObjectSchema } from './ArcadeCardCreateWithoutRedemptionsInput.schema';
import { ArcadeCardUncheckedCreateWithoutRedemptionsInputObjectSchema as ArcadeCardUncheckedCreateWithoutRedemptionsInputObjectSchema } from './ArcadeCardUncheckedCreateWithoutRedemptionsInput.schema';
import { ArcadeCardCreateOrConnectWithoutRedemptionsInputObjectSchema as ArcadeCardCreateOrConnectWithoutRedemptionsInputObjectSchema } from './ArcadeCardCreateOrConnectWithoutRedemptionsInput.schema';
import { ArcadeCardUpsertWithoutRedemptionsInputObjectSchema as ArcadeCardUpsertWithoutRedemptionsInputObjectSchema } from './ArcadeCardUpsertWithoutRedemptionsInput.schema';
import { ArcadeCardWhereInputObjectSchema as ArcadeCardWhereInputObjectSchema } from './ArcadeCardWhereInput.schema';
import { ArcadeCardWhereUniqueInputObjectSchema as ArcadeCardWhereUniqueInputObjectSchema } from './ArcadeCardWhereUniqueInput.schema';
import { ArcadeCardUpdateToOneWithWhereWithoutRedemptionsInputObjectSchema as ArcadeCardUpdateToOneWithWhereWithoutRedemptionsInputObjectSchema } from './ArcadeCardUpdateToOneWithWhereWithoutRedemptionsInput.schema';
import { ArcadeCardUpdateWithoutRedemptionsInputObjectSchema as ArcadeCardUpdateWithoutRedemptionsInputObjectSchema } from './ArcadeCardUpdateWithoutRedemptionsInput.schema';
import { ArcadeCardUncheckedUpdateWithoutRedemptionsInputObjectSchema as ArcadeCardUncheckedUpdateWithoutRedemptionsInputObjectSchema } from './ArcadeCardUncheckedUpdateWithoutRedemptionsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ArcadeCardCreateWithoutRedemptionsInputObjectSchema), z.lazy(() => ArcadeCardUncheckedCreateWithoutRedemptionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ArcadeCardCreateOrConnectWithoutRedemptionsInputObjectSchema).optional(),
  upsert: z.lazy(() => ArcadeCardUpsertWithoutRedemptionsInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => ArcadeCardWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => ArcadeCardWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => ArcadeCardWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ArcadeCardUpdateToOneWithWhereWithoutRedemptionsInputObjectSchema), z.lazy(() => ArcadeCardUpdateWithoutRedemptionsInputObjectSchema), z.lazy(() => ArcadeCardUncheckedUpdateWithoutRedemptionsInputObjectSchema)]).optional()
}).strict();
export const ArcadeCardUpdateOneWithoutRedemptionsNestedInputObjectSchema: z.ZodType<Prisma.ArcadeCardUpdateOneWithoutRedemptionsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardUpdateOneWithoutRedemptionsNestedInput>;
export const ArcadeCardUpdateOneWithoutRedemptionsNestedInputObjectZodSchema = makeSchema();
