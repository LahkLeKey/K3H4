import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeSessionWhereUniqueInputObjectSchema as ArcadeSessionWhereUniqueInputObjectSchema } from './ArcadeSessionWhereUniqueInput.schema';
import { ArcadeSessionUpdateWithoutCardInputObjectSchema as ArcadeSessionUpdateWithoutCardInputObjectSchema } from './ArcadeSessionUpdateWithoutCardInput.schema';
import { ArcadeSessionUncheckedUpdateWithoutCardInputObjectSchema as ArcadeSessionUncheckedUpdateWithoutCardInputObjectSchema } from './ArcadeSessionUncheckedUpdateWithoutCardInput.schema';
import { ArcadeSessionCreateWithoutCardInputObjectSchema as ArcadeSessionCreateWithoutCardInputObjectSchema } from './ArcadeSessionCreateWithoutCardInput.schema';
import { ArcadeSessionUncheckedCreateWithoutCardInputObjectSchema as ArcadeSessionUncheckedCreateWithoutCardInputObjectSchema } from './ArcadeSessionUncheckedCreateWithoutCardInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ArcadeSessionUpdateWithoutCardInputObjectSchema), z.lazy(() => ArcadeSessionUncheckedUpdateWithoutCardInputObjectSchema)]),
  create: z.union([z.lazy(() => ArcadeSessionCreateWithoutCardInputObjectSchema), z.lazy(() => ArcadeSessionUncheckedCreateWithoutCardInputObjectSchema)])
}).strict();
export const ArcadeSessionUpsertWithWhereUniqueWithoutCardInputObjectSchema: z.ZodType<Prisma.ArcadeSessionUpsertWithWhereUniqueWithoutCardInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionUpsertWithWhereUniqueWithoutCardInput>;
export const ArcadeSessionUpsertWithWhereUniqueWithoutCardInputObjectZodSchema = makeSchema();
