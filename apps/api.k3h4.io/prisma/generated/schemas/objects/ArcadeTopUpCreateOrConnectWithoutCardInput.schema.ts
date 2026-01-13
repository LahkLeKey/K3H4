import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeTopUpWhereUniqueInputObjectSchema as ArcadeTopUpWhereUniqueInputObjectSchema } from './ArcadeTopUpWhereUniqueInput.schema';
import { ArcadeTopUpCreateWithoutCardInputObjectSchema as ArcadeTopUpCreateWithoutCardInputObjectSchema } from './ArcadeTopUpCreateWithoutCardInput.schema';
import { ArcadeTopUpUncheckedCreateWithoutCardInputObjectSchema as ArcadeTopUpUncheckedCreateWithoutCardInputObjectSchema } from './ArcadeTopUpUncheckedCreateWithoutCardInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeTopUpWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ArcadeTopUpCreateWithoutCardInputObjectSchema), z.lazy(() => ArcadeTopUpUncheckedCreateWithoutCardInputObjectSchema)])
}).strict();
export const ArcadeTopUpCreateOrConnectWithoutCardInputObjectSchema: z.ZodType<Prisma.ArcadeTopUpCreateOrConnectWithoutCardInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeTopUpCreateOrConnectWithoutCardInput>;
export const ArcadeTopUpCreateOrConnectWithoutCardInputObjectZodSchema = makeSchema();
