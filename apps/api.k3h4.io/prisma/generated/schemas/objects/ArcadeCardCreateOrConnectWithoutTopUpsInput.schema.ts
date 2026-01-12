import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeCardWhereUniqueInputObjectSchema as ArcadeCardWhereUniqueInputObjectSchema } from './ArcadeCardWhereUniqueInput.schema';
import { ArcadeCardCreateWithoutTopUpsInputObjectSchema as ArcadeCardCreateWithoutTopUpsInputObjectSchema } from './ArcadeCardCreateWithoutTopUpsInput.schema';
import { ArcadeCardUncheckedCreateWithoutTopUpsInputObjectSchema as ArcadeCardUncheckedCreateWithoutTopUpsInputObjectSchema } from './ArcadeCardUncheckedCreateWithoutTopUpsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeCardWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ArcadeCardCreateWithoutTopUpsInputObjectSchema), z.lazy(() => ArcadeCardUncheckedCreateWithoutTopUpsInputObjectSchema)])
}).strict();
export const ArcadeCardCreateOrConnectWithoutTopUpsInputObjectSchema: z.ZodType<Prisma.ArcadeCardCreateOrConnectWithoutTopUpsInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardCreateOrConnectWithoutTopUpsInput>;
export const ArcadeCardCreateOrConnectWithoutTopUpsInputObjectZodSchema = makeSchema();
