import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeTopUpWhereUniqueInputObjectSchema as ArcadeTopUpWhereUniqueInputObjectSchema } from './ArcadeTopUpWhereUniqueInput.schema';
import { ArcadeTopUpCreateWithoutUserInputObjectSchema as ArcadeTopUpCreateWithoutUserInputObjectSchema } from './ArcadeTopUpCreateWithoutUserInput.schema';
import { ArcadeTopUpUncheckedCreateWithoutUserInputObjectSchema as ArcadeTopUpUncheckedCreateWithoutUserInputObjectSchema } from './ArcadeTopUpUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeTopUpWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ArcadeTopUpCreateWithoutUserInputObjectSchema), z.lazy(() => ArcadeTopUpUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const ArcadeTopUpCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.ArcadeTopUpCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeTopUpCreateOrConnectWithoutUserInput>;
export const ArcadeTopUpCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
