import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeCardUpdateWithoutTopUpsInputObjectSchema as ArcadeCardUpdateWithoutTopUpsInputObjectSchema } from './ArcadeCardUpdateWithoutTopUpsInput.schema';
import { ArcadeCardUncheckedUpdateWithoutTopUpsInputObjectSchema as ArcadeCardUncheckedUpdateWithoutTopUpsInputObjectSchema } from './ArcadeCardUncheckedUpdateWithoutTopUpsInput.schema';
import { ArcadeCardCreateWithoutTopUpsInputObjectSchema as ArcadeCardCreateWithoutTopUpsInputObjectSchema } from './ArcadeCardCreateWithoutTopUpsInput.schema';
import { ArcadeCardUncheckedCreateWithoutTopUpsInputObjectSchema as ArcadeCardUncheckedCreateWithoutTopUpsInputObjectSchema } from './ArcadeCardUncheckedCreateWithoutTopUpsInput.schema';
import { ArcadeCardWhereInputObjectSchema as ArcadeCardWhereInputObjectSchema } from './ArcadeCardWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ArcadeCardUpdateWithoutTopUpsInputObjectSchema), z.lazy(() => ArcadeCardUncheckedUpdateWithoutTopUpsInputObjectSchema)]),
  create: z.union([z.lazy(() => ArcadeCardCreateWithoutTopUpsInputObjectSchema), z.lazy(() => ArcadeCardUncheckedCreateWithoutTopUpsInputObjectSchema)]),
  where: z.lazy(() => ArcadeCardWhereInputObjectSchema).optional()
}).strict();
export const ArcadeCardUpsertWithoutTopUpsInputObjectSchema: z.ZodType<Prisma.ArcadeCardUpsertWithoutTopUpsInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardUpsertWithoutTopUpsInput>;
export const ArcadeCardUpsertWithoutTopUpsInputObjectZodSchema = makeSchema();
