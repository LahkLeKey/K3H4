import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeCardCreateWithoutTopUpsInputObjectSchema as ArcadeCardCreateWithoutTopUpsInputObjectSchema } from './ArcadeCardCreateWithoutTopUpsInput.schema';
import { ArcadeCardUncheckedCreateWithoutTopUpsInputObjectSchema as ArcadeCardUncheckedCreateWithoutTopUpsInputObjectSchema } from './ArcadeCardUncheckedCreateWithoutTopUpsInput.schema';
import { ArcadeCardCreateOrConnectWithoutTopUpsInputObjectSchema as ArcadeCardCreateOrConnectWithoutTopUpsInputObjectSchema } from './ArcadeCardCreateOrConnectWithoutTopUpsInput.schema';
import { ArcadeCardUpsertWithoutTopUpsInputObjectSchema as ArcadeCardUpsertWithoutTopUpsInputObjectSchema } from './ArcadeCardUpsertWithoutTopUpsInput.schema';
import { ArcadeCardWhereUniqueInputObjectSchema as ArcadeCardWhereUniqueInputObjectSchema } from './ArcadeCardWhereUniqueInput.schema';
import { ArcadeCardUpdateToOneWithWhereWithoutTopUpsInputObjectSchema as ArcadeCardUpdateToOneWithWhereWithoutTopUpsInputObjectSchema } from './ArcadeCardUpdateToOneWithWhereWithoutTopUpsInput.schema';
import { ArcadeCardUpdateWithoutTopUpsInputObjectSchema as ArcadeCardUpdateWithoutTopUpsInputObjectSchema } from './ArcadeCardUpdateWithoutTopUpsInput.schema';
import { ArcadeCardUncheckedUpdateWithoutTopUpsInputObjectSchema as ArcadeCardUncheckedUpdateWithoutTopUpsInputObjectSchema } from './ArcadeCardUncheckedUpdateWithoutTopUpsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ArcadeCardCreateWithoutTopUpsInputObjectSchema), z.lazy(() => ArcadeCardUncheckedCreateWithoutTopUpsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ArcadeCardCreateOrConnectWithoutTopUpsInputObjectSchema).optional(),
  upsert: z.lazy(() => ArcadeCardUpsertWithoutTopUpsInputObjectSchema).optional(),
  connect: z.lazy(() => ArcadeCardWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ArcadeCardUpdateToOneWithWhereWithoutTopUpsInputObjectSchema), z.lazy(() => ArcadeCardUpdateWithoutTopUpsInputObjectSchema), z.lazy(() => ArcadeCardUncheckedUpdateWithoutTopUpsInputObjectSchema)]).optional()
}).strict();
export const ArcadeCardUpdateOneRequiredWithoutTopUpsNestedInputObjectSchema: z.ZodType<Prisma.ArcadeCardUpdateOneRequiredWithoutTopUpsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardUpdateOneRequiredWithoutTopUpsNestedInput>;
export const ArcadeCardUpdateOneRequiredWithoutTopUpsNestedInputObjectZodSchema = makeSchema();
