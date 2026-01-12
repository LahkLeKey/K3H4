import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeSessionWhereUniqueInputObjectSchema as ArcadeSessionWhereUniqueInputObjectSchema } from './ArcadeSessionWhereUniqueInput.schema';
import { ArcadeSessionCreateWithoutCardInputObjectSchema as ArcadeSessionCreateWithoutCardInputObjectSchema } from './ArcadeSessionCreateWithoutCardInput.schema';
import { ArcadeSessionUncheckedCreateWithoutCardInputObjectSchema as ArcadeSessionUncheckedCreateWithoutCardInputObjectSchema } from './ArcadeSessionUncheckedCreateWithoutCardInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeSessionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ArcadeSessionCreateWithoutCardInputObjectSchema), z.lazy(() => ArcadeSessionUncheckedCreateWithoutCardInputObjectSchema)])
}).strict();
export const ArcadeSessionCreateOrConnectWithoutCardInputObjectSchema: z.ZodType<Prisma.ArcadeSessionCreateOrConnectWithoutCardInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionCreateOrConnectWithoutCardInput>;
export const ArcadeSessionCreateOrConnectWithoutCardInputObjectZodSchema = makeSchema();
