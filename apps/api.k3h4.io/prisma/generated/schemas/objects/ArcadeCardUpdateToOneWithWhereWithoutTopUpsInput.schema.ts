import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeCardWhereInputObjectSchema as ArcadeCardWhereInputObjectSchema } from './ArcadeCardWhereInput.schema';
import { ArcadeCardUpdateWithoutTopUpsInputObjectSchema as ArcadeCardUpdateWithoutTopUpsInputObjectSchema } from './ArcadeCardUpdateWithoutTopUpsInput.schema';
import { ArcadeCardUncheckedUpdateWithoutTopUpsInputObjectSchema as ArcadeCardUncheckedUpdateWithoutTopUpsInputObjectSchema } from './ArcadeCardUncheckedUpdateWithoutTopUpsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeCardWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ArcadeCardUpdateWithoutTopUpsInputObjectSchema), z.lazy(() => ArcadeCardUncheckedUpdateWithoutTopUpsInputObjectSchema)])
}).strict();
export const ArcadeCardUpdateToOneWithWhereWithoutTopUpsInputObjectSchema: z.ZodType<Prisma.ArcadeCardUpdateToOneWithWhereWithoutTopUpsInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardUpdateToOneWithWhereWithoutTopUpsInput>;
export const ArcadeCardUpdateToOneWithWhereWithoutTopUpsInputObjectZodSchema = makeSchema();
