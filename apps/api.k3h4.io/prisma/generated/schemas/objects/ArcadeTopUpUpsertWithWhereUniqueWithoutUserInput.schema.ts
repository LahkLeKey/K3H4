import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeTopUpWhereUniqueInputObjectSchema as ArcadeTopUpWhereUniqueInputObjectSchema } from './ArcadeTopUpWhereUniqueInput.schema';
import { ArcadeTopUpUpdateWithoutUserInputObjectSchema as ArcadeTopUpUpdateWithoutUserInputObjectSchema } from './ArcadeTopUpUpdateWithoutUserInput.schema';
import { ArcadeTopUpUncheckedUpdateWithoutUserInputObjectSchema as ArcadeTopUpUncheckedUpdateWithoutUserInputObjectSchema } from './ArcadeTopUpUncheckedUpdateWithoutUserInput.schema';
import { ArcadeTopUpCreateWithoutUserInputObjectSchema as ArcadeTopUpCreateWithoutUserInputObjectSchema } from './ArcadeTopUpCreateWithoutUserInput.schema';
import { ArcadeTopUpUncheckedCreateWithoutUserInputObjectSchema as ArcadeTopUpUncheckedCreateWithoutUserInputObjectSchema } from './ArcadeTopUpUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeTopUpWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ArcadeTopUpUpdateWithoutUserInputObjectSchema), z.lazy(() => ArcadeTopUpUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => ArcadeTopUpCreateWithoutUserInputObjectSchema), z.lazy(() => ArcadeTopUpUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const ArcadeTopUpUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.ArcadeTopUpUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeTopUpUpsertWithWhereUniqueWithoutUserInput>;
export const ArcadeTopUpUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
