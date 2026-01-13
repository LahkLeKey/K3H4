import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProviderGrantScalarWhereInputObjectSchema as ProviderGrantScalarWhereInputObjectSchema } from './ProviderGrantScalarWhereInput.schema';
import { ProviderGrantUpdateManyMutationInputObjectSchema as ProviderGrantUpdateManyMutationInputObjectSchema } from './ProviderGrantUpdateManyMutationInput.schema';
import { ProviderGrantUncheckedUpdateManyWithoutUserInputObjectSchema as ProviderGrantUncheckedUpdateManyWithoutUserInputObjectSchema } from './ProviderGrantUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProviderGrantScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ProviderGrantUpdateManyMutationInputObjectSchema), z.lazy(() => ProviderGrantUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const ProviderGrantUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.ProviderGrantUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ProviderGrantUpdateManyWithWhereWithoutUserInput>;
export const ProviderGrantUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
