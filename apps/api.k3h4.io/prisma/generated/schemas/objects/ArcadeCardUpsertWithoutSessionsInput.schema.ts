import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeCardUpdateWithoutSessionsInputObjectSchema as ArcadeCardUpdateWithoutSessionsInputObjectSchema } from './ArcadeCardUpdateWithoutSessionsInput.schema';
import { ArcadeCardUncheckedUpdateWithoutSessionsInputObjectSchema as ArcadeCardUncheckedUpdateWithoutSessionsInputObjectSchema } from './ArcadeCardUncheckedUpdateWithoutSessionsInput.schema';
import { ArcadeCardCreateWithoutSessionsInputObjectSchema as ArcadeCardCreateWithoutSessionsInputObjectSchema } from './ArcadeCardCreateWithoutSessionsInput.schema';
import { ArcadeCardUncheckedCreateWithoutSessionsInputObjectSchema as ArcadeCardUncheckedCreateWithoutSessionsInputObjectSchema } from './ArcadeCardUncheckedCreateWithoutSessionsInput.schema';
import { ArcadeCardWhereInputObjectSchema as ArcadeCardWhereInputObjectSchema } from './ArcadeCardWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ArcadeCardUpdateWithoutSessionsInputObjectSchema), z.lazy(() => ArcadeCardUncheckedUpdateWithoutSessionsInputObjectSchema)]),
  create: z.union([z.lazy(() => ArcadeCardCreateWithoutSessionsInputObjectSchema), z.lazy(() => ArcadeCardUncheckedCreateWithoutSessionsInputObjectSchema)]),
  where: z.lazy(() => ArcadeCardWhereInputObjectSchema).optional()
}).strict();
export const ArcadeCardUpsertWithoutSessionsInputObjectSchema: z.ZodType<Prisma.ArcadeCardUpsertWithoutSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardUpsertWithoutSessionsInput>;
export const ArcadeCardUpsertWithoutSessionsInputObjectZodSchema = makeSchema();
