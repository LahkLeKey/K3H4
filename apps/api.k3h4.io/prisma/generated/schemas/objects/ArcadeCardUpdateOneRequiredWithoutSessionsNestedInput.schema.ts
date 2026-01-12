import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeCardCreateWithoutSessionsInputObjectSchema as ArcadeCardCreateWithoutSessionsInputObjectSchema } from './ArcadeCardCreateWithoutSessionsInput.schema';
import { ArcadeCardUncheckedCreateWithoutSessionsInputObjectSchema as ArcadeCardUncheckedCreateWithoutSessionsInputObjectSchema } from './ArcadeCardUncheckedCreateWithoutSessionsInput.schema';
import { ArcadeCardCreateOrConnectWithoutSessionsInputObjectSchema as ArcadeCardCreateOrConnectWithoutSessionsInputObjectSchema } from './ArcadeCardCreateOrConnectWithoutSessionsInput.schema';
import { ArcadeCardUpsertWithoutSessionsInputObjectSchema as ArcadeCardUpsertWithoutSessionsInputObjectSchema } from './ArcadeCardUpsertWithoutSessionsInput.schema';
import { ArcadeCardWhereUniqueInputObjectSchema as ArcadeCardWhereUniqueInputObjectSchema } from './ArcadeCardWhereUniqueInput.schema';
import { ArcadeCardUpdateToOneWithWhereWithoutSessionsInputObjectSchema as ArcadeCardUpdateToOneWithWhereWithoutSessionsInputObjectSchema } from './ArcadeCardUpdateToOneWithWhereWithoutSessionsInput.schema';
import { ArcadeCardUpdateWithoutSessionsInputObjectSchema as ArcadeCardUpdateWithoutSessionsInputObjectSchema } from './ArcadeCardUpdateWithoutSessionsInput.schema';
import { ArcadeCardUncheckedUpdateWithoutSessionsInputObjectSchema as ArcadeCardUncheckedUpdateWithoutSessionsInputObjectSchema } from './ArcadeCardUncheckedUpdateWithoutSessionsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ArcadeCardCreateWithoutSessionsInputObjectSchema), z.lazy(() => ArcadeCardUncheckedCreateWithoutSessionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ArcadeCardCreateOrConnectWithoutSessionsInputObjectSchema).optional(),
  upsert: z.lazy(() => ArcadeCardUpsertWithoutSessionsInputObjectSchema).optional(),
  connect: z.lazy(() => ArcadeCardWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ArcadeCardUpdateToOneWithWhereWithoutSessionsInputObjectSchema), z.lazy(() => ArcadeCardUpdateWithoutSessionsInputObjectSchema), z.lazy(() => ArcadeCardUncheckedUpdateWithoutSessionsInputObjectSchema)]).optional()
}).strict();
export const ArcadeCardUpdateOneRequiredWithoutSessionsNestedInputObjectSchema: z.ZodType<Prisma.ArcadeCardUpdateOneRequiredWithoutSessionsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardUpdateOneRequiredWithoutSessionsNestedInput>;
export const ArcadeCardUpdateOneRequiredWithoutSessionsNestedInputObjectZodSchema = makeSchema();
