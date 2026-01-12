import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeTopUpWhereUniqueInputObjectSchema as ArcadeTopUpWhereUniqueInputObjectSchema } from './ArcadeTopUpWhereUniqueInput.schema';
import { ArcadeTopUpUpdateWithoutCardInputObjectSchema as ArcadeTopUpUpdateWithoutCardInputObjectSchema } from './ArcadeTopUpUpdateWithoutCardInput.schema';
import { ArcadeTopUpUncheckedUpdateWithoutCardInputObjectSchema as ArcadeTopUpUncheckedUpdateWithoutCardInputObjectSchema } from './ArcadeTopUpUncheckedUpdateWithoutCardInput.schema';
import { ArcadeTopUpCreateWithoutCardInputObjectSchema as ArcadeTopUpCreateWithoutCardInputObjectSchema } from './ArcadeTopUpCreateWithoutCardInput.schema';
import { ArcadeTopUpUncheckedCreateWithoutCardInputObjectSchema as ArcadeTopUpUncheckedCreateWithoutCardInputObjectSchema } from './ArcadeTopUpUncheckedCreateWithoutCardInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeTopUpWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ArcadeTopUpUpdateWithoutCardInputObjectSchema), z.lazy(() => ArcadeTopUpUncheckedUpdateWithoutCardInputObjectSchema)]),
  create: z.union([z.lazy(() => ArcadeTopUpCreateWithoutCardInputObjectSchema), z.lazy(() => ArcadeTopUpUncheckedCreateWithoutCardInputObjectSchema)])
}).strict();
export const ArcadeTopUpUpsertWithWhereUniqueWithoutCardInputObjectSchema: z.ZodType<Prisma.ArcadeTopUpUpsertWithWhereUniqueWithoutCardInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeTopUpUpsertWithWhereUniqueWithoutCardInput>;
export const ArcadeTopUpUpsertWithWhereUniqueWithoutCardInputObjectZodSchema = makeSchema();
