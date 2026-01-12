import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeCardWhereInputObjectSchema as ArcadeCardWhereInputObjectSchema } from './ArcadeCardWhereInput.schema';
import { ArcadeCardUpdateWithoutSessionsInputObjectSchema as ArcadeCardUpdateWithoutSessionsInputObjectSchema } from './ArcadeCardUpdateWithoutSessionsInput.schema';
import { ArcadeCardUncheckedUpdateWithoutSessionsInputObjectSchema as ArcadeCardUncheckedUpdateWithoutSessionsInputObjectSchema } from './ArcadeCardUncheckedUpdateWithoutSessionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeCardWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ArcadeCardUpdateWithoutSessionsInputObjectSchema), z.lazy(() => ArcadeCardUncheckedUpdateWithoutSessionsInputObjectSchema)])
}).strict();
export const ArcadeCardUpdateToOneWithWhereWithoutSessionsInputObjectSchema: z.ZodType<Prisma.ArcadeCardUpdateToOneWithWhereWithoutSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardUpdateToOneWithWhereWithoutSessionsInput>;
export const ArcadeCardUpdateToOneWithWhereWithoutSessionsInputObjectZodSchema = makeSchema();
