import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProviderGrantWhereUniqueInputObjectSchema as ProviderGrantWhereUniqueInputObjectSchema } from './ProviderGrantWhereUniqueInput.schema';
import { ProviderGrantUpdateWithoutUserInputObjectSchema as ProviderGrantUpdateWithoutUserInputObjectSchema } from './ProviderGrantUpdateWithoutUserInput.schema';
import { ProviderGrantUncheckedUpdateWithoutUserInputObjectSchema as ProviderGrantUncheckedUpdateWithoutUserInputObjectSchema } from './ProviderGrantUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProviderGrantWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ProviderGrantUpdateWithoutUserInputObjectSchema), z.lazy(() => ProviderGrantUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const ProviderGrantUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.ProviderGrantUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ProviderGrantUpdateWithWhereUniqueWithoutUserInput>;
export const ProviderGrantUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
