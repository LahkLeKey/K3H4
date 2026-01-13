import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeCardCreateWithoutTopUpsInputObjectSchema as ArcadeCardCreateWithoutTopUpsInputObjectSchema } from './ArcadeCardCreateWithoutTopUpsInput.schema';
import { ArcadeCardUncheckedCreateWithoutTopUpsInputObjectSchema as ArcadeCardUncheckedCreateWithoutTopUpsInputObjectSchema } from './ArcadeCardUncheckedCreateWithoutTopUpsInput.schema';
import { ArcadeCardCreateOrConnectWithoutTopUpsInputObjectSchema as ArcadeCardCreateOrConnectWithoutTopUpsInputObjectSchema } from './ArcadeCardCreateOrConnectWithoutTopUpsInput.schema';
import { ArcadeCardWhereUniqueInputObjectSchema as ArcadeCardWhereUniqueInputObjectSchema } from './ArcadeCardWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ArcadeCardCreateWithoutTopUpsInputObjectSchema), z.lazy(() => ArcadeCardUncheckedCreateWithoutTopUpsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ArcadeCardCreateOrConnectWithoutTopUpsInputObjectSchema).optional(),
  connect: z.lazy(() => ArcadeCardWhereUniqueInputObjectSchema).optional()
}).strict();
export const ArcadeCardCreateNestedOneWithoutTopUpsInputObjectSchema: z.ZodType<Prisma.ArcadeCardCreateNestedOneWithoutTopUpsInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardCreateNestedOneWithoutTopUpsInput>;
export const ArcadeCardCreateNestedOneWithoutTopUpsInputObjectZodSchema = makeSchema();
