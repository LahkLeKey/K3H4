import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeSessionWhereUniqueInputObjectSchema as ArcadeSessionWhereUniqueInputObjectSchema } from './ArcadeSessionWhereUniqueInput.schema';
import { ArcadeSessionCreateWithoutUserInputObjectSchema as ArcadeSessionCreateWithoutUserInputObjectSchema } from './ArcadeSessionCreateWithoutUserInput.schema';
import { ArcadeSessionUncheckedCreateWithoutUserInputObjectSchema as ArcadeSessionUncheckedCreateWithoutUserInputObjectSchema } from './ArcadeSessionUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ArcadeSessionCreateWithoutUserInputObjectSchema), z.lazy(() => ArcadeSessionUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const ArcadeSessionCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.ArcadeSessionCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionCreateOrConnectWithoutUserInput>;
export const ArcadeSessionCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
