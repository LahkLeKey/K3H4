import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeTopUpWhereUniqueInputObjectSchema as ArcadeTopUpWhereUniqueInputObjectSchema } from './ArcadeTopUpWhereUniqueInput.schema';
import { ArcadeTopUpUpdateWithoutCardInputObjectSchema as ArcadeTopUpUpdateWithoutCardInputObjectSchema } from './ArcadeTopUpUpdateWithoutCardInput.schema';
import { ArcadeTopUpUncheckedUpdateWithoutCardInputObjectSchema as ArcadeTopUpUncheckedUpdateWithoutCardInputObjectSchema } from './ArcadeTopUpUncheckedUpdateWithoutCardInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeTopUpWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ArcadeTopUpUpdateWithoutCardInputObjectSchema), z.lazy(() => ArcadeTopUpUncheckedUpdateWithoutCardInputObjectSchema)])
}).strict();
export const ArcadeTopUpUpdateWithWhereUniqueWithoutCardInputObjectSchema: z.ZodType<Prisma.ArcadeTopUpUpdateWithWhereUniqueWithoutCardInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeTopUpUpdateWithWhereUniqueWithoutCardInput>;
export const ArcadeTopUpUpdateWithWhereUniqueWithoutCardInputObjectZodSchema = makeSchema();
