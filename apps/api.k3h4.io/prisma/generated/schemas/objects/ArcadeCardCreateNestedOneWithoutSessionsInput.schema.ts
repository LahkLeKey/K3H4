import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeCardCreateWithoutSessionsInputObjectSchema as ArcadeCardCreateWithoutSessionsInputObjectSchema } from './ArcadeCardCreateWithoutSessionsInput.schema';
import { ArcadeCardUncheckedCreateWithoutSessionsInputObjectSchema as ArcadeCardUncheckedCreateWithoutSessionsInputObjectSchema } from './ArcadeCardUncheckedCreateWithoutSessionsInput.schema';
import { ArcadeCardCreateOrConnectWithoutSessionsInputObjectSchema as ArcadeCardCreateOrConnectWithoutSessionsInputObjectSchema } from './ArcadeCardCreateOrConnectWithoutSessionsInput.schema';
import { ArcadeCardWhereUniqueInputObjectSchema as ArcadeCardWhereUniqueInputObjectSchema } from './ArcadeCardWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ArcadeCardCreateWithoutSessionsInputObjectSchema), z.lazy(() => ArcadeCardUncheckedCreateWithoutSessionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ArcadeCardCreateOrConnectWithoutSessionsInputObjectSchema).optional(),
  connect: z.lazy(() => ArcadeCardWhereUniqueInputObjectSchema).optional()
}).strict();
export const ArcadeCardCreateNestedOneWithoutSessionsInputObjectSchema: z.ZodType<Prisma.ArcadeCardCreateNestedOneWithoutSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardCreateNestedOneWithoutSessionsInput>;
export const ArcadeCardCreateNestedOneWithoutSessionsInputObjectZodSchema = makeSchema();
