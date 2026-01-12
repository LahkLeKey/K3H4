import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeSessionWhereUniqueInputObjectSchema as ArcadeSessionWhereUniqueInputObjectSchema } from './ArcadeSessionWhereUniqueInput.schema';
import { ArcadeSessionUpdateWithoutCardInputObjectSchema as ArcadeSessionUpdateWithoutCardInputObjectSchema } from './ArcadeSessionUpdateWithoutCardInput.schema';
import { ArcadeSessionUncheckedUpdateWithoutCardInputObjectSchema as ArcadeSessionUncheckedUpdateWithoutCardInputObjectSchema } from './ArcadeSessionUncheckedUpdateWithoutCardInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ArcadeSessionUpdateWithoutCardInputObjectSchema), z.lazy(() => ArcadeSessionUncheckedUpdateWithoutCardInputObjectSchema)])
}).strict();
export const ArcadeSessionUpdateWithWhereUniqueWithoutCardInputObjectSchema: z.ZodType<Prisma.ArcadeSessionUpdateWithWhereUniqueWithoutCardInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionUpdateWithWhereUniqueWithoutCardInput>;
export const ArcadeSessionUpdateWithWhereUniqueWithoutCardInputObjectZodSchema = makeSchema();
