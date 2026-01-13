import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeCardWhereUniqueInputObjectSchema as ArcadeCardWhereUniqueInputObjectSchema } from './ArcadeCardWhereUniqueInput.schema';
import { ArcadeCardCreateWithoutUserInputObjectSchema as ArcadeCardCreateWithoutUserInputObjectSchema } from './ArcadeCardCreateWithoutUserInput.schema';
import { ArcadeCardUncheckedCreateWithoutUserInputObjectSchema as ArcadeCardUncheckedCreateWithoutUserInputObjectSchema } from './ArcadeCardUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeCardWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ArcadeCardCreateWithoutUserInputObjectSchema), z.lazy(() => ArcadeCardUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const ArcadeCardCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.ArcadeCardCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardCreateOrConnectWithoutUserInput>;
export const ArcadeCardCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
