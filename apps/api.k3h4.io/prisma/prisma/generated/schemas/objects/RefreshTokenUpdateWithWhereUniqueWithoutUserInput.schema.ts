import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RefreshTokenWhereUniqueInputObjectSchema as RefreshTokenWhereUniqueInputObjectSchema } from './RefreshTokenWhereUniqueInput.schema';
import { RefreshTokenUpdateWithoutUserInputObjectSchema as RefreshTokenUpdateWithoutUserInputObjectSchema } from './RefreshTokenUpdateWithoutUserInput.schema';
import { RefreshTokenUncheckedUpdateWithoutUserInputObjectSchema as RefreshTokenUncheckedUpdateWithoutUserInputObjectSchema } from './RefreshTokenUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RefreshTokenWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => RefreshTokenUpdateWithoutUserInputObjectSchema), z.lazy(() => RefreshTokenUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const RefreshTokenUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.RefreshTokenUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.RefreshTokenUpdateWithWhereUniqueWithoutUserInput>;
export const RefreshTokenUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
