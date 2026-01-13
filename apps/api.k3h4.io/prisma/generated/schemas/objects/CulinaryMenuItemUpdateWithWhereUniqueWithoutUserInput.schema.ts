import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CulinaryMenuItemWhereUniqueInputObjectSchema as CulinaryMenuItemWhereUniqueInputObjectSchema } from './CulinaryMenuItemWhereUniqueInput.schema';
import { CulinaryMenuItemUpdateWithoutUserInputObjectSchema as CulinaryMenuItemUpdateWithoutUserInputObjectSchema } from './CulinaryMenuItemUpdateWithoutUserInput.schema';
import { CulinaryMenuItemUncheckedUpdateWithoutUserInputObjectSchema as CulinaryMenuItemUncheckedUpdateWithoutUserInputObjectSchema } from './CulinaryMenuItemUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CulinaryMenuItemWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CulinaryMenuItemUpdateWithoutUserInputObjectSchema), z.lazy(() => CulinaryMenuItemUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const CulinaryMenuItemUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.CulinaryMenuItemUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryMenuItemUpdateWithWhereUniqueWithoutUserInput>;
export const CulinaryMenuItemUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
