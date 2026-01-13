import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeCardWhereUniqueInputObjectSchema as ArcadeCardWhereUniqueInputObjectSchema } from './ArcadeCardWhereUniqueInput.schema';
import { ArcadeCardCreateWithoutSessionsInputObjectSchema as ArcadeCardCreateWithoutSessionsInputObjectSchema } from './ArcadeCardCreateWithoutSessionsInput.schema';
import { ArcadeCardUncheckedCreateWithoutSessionsInputObjectSchema as ArcadeCardUncheckedCreateWithoutSessionsInputObjectSchema } from './ArcadeCardUncheckedCreateWithoutSessionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeCardWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ArcadeCardCreateWithoutSessionsInputObjectSchema), z.lazy(() => ArcadeCardUncheckedCreateWithoutSessionsInputObjectSchema)])
}).strict();
export const ArcadeCardCreateOrConnectWithoutSessionsInputObjectSchema: z.ZodType<Prisma.ArcadeCardCreateOrConnectWithoutSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardCreateOrConnectWithoutSessionsInput>;
export const ArcadeCardCreateOrConnectWithoutSessionsInputObjectZodSchema = makeSchema();
