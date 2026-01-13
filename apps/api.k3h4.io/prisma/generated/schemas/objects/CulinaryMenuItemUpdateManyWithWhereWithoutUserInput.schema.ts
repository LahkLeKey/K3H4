import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CulinaryMenuItemScalarWhereInputObjectSchema as CulinaryMenuItemScalarWhereInputObjectSchema } from './CulinaryMenuItemScalarWhereInput.schema';
import { CulinaryMenuItemUpdateManyMutationInputObjectSchema as CulinaryMenuItemUpdateManyMutationInputObjectSchema } from './CulinaryMenuItemUpdateManyMutationInput.schema';
import { CulinaryMenuItemUncheckedUpdateManyWithoutUserInputObjectSchema as CulinaryMenuItemUncheckedUpdateManyWithoutUserInputObjectSchema } from './CulinaryMenuItemUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CulinaryMenuItemScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CulinaryMenuItemUpdateManyMutationInputObjectSchema), z.lazy(() => CulinaryMenuItemUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const CulinaryMenuItemUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.CulinaryMenuItemUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryMenuItemUpdateManyWithWhereWithoutUserInput>;
export const CulinaryMenuItemUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
