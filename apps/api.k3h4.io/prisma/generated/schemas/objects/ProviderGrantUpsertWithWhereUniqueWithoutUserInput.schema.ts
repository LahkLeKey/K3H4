import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProviderGrantWhereUniqueInputObjectSchema as ProviderGrantWhereUniqueInputObjectSchema } from './ProviderGrantWhereUniqueInput.schema';
import { ProviderGrantUpdateWithoutUserInputObjectSchema as ProviderGrantUpdateWithoutUserInputObjectSchema } from './ProviderGrantUpdateWithoutUserInput.schema';
import { ProviderGrantUncheckedUpdateWithoutUserInputObjectSchema as ProviderGrantUncheckedUpdateWithoutUserInputObjectSchema } from './ProviderGrantUncheckedUpdateWithoutUserInput.schema';
import { ProviderGrantCreateWithoutUserInputObjectSchema as ProviderGrantCreateWithoutUserInputObjectSchema } from './ProviderGrantCreateWithoutUserInput.schema';
import { ProviderGrantUncheckedCreateWithoutUserInputObjectSchema as ProviderGrantUncheckedCreateWithoutUserInputObjectSchema } from './ProviderGrantUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProviderGrantWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ProviderGrantUpdateWithoutUserInputObjectSchema), z.lazy(() => ProviderGrantUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => ProviderGrantCreateWithoutUserInputObjectSchema), z.lazy(() => ProviderGrantUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const ProviderGrantUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.ProviderGrantUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ProviderGrantUpsertWithWhereUniqueWithoutUserInput>;
export const ProviderGrantUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
