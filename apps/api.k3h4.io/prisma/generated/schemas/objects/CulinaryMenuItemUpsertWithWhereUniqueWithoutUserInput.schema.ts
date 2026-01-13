import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CulinaryMenuItemWhereUniqueInputObjectSchema as CulinaryMenuItemWhereUniqueInputObjectSchema } from './CulinaryMenuItemWhereUniqueInput.schema';
import { CulinaryMenuItemUpdateWithoutUserInputObjectSchema as CulinaryMenuItemUpdateWithoutUserInputObjectSchema } from './CulinaryMenuItemUpdateWithoutUserInput.schema';
import { CulinaryMenuItemUncheckedUpdateWithoutUserInputObjectSchema as CulinaryMenuItemUncheckedUpdateWithoutUserInputObjectSchema } from './CulinaryMenuItemUncheckedUpdateWithoutUserInput.schema';
import { CulinaryMenuItemCreateWithoutUserInputObjectSchema as CulinaryMenuItemCreateWithoutUserInputObjectSchema } from './CulinaryMenuItemCreateWithoutUserInput.schema';
import { CulinaryMenuItemUncheckedCreateWithoutUserInputObjectSchema as CulinaryMenuItemUncheckedCreateWithoutUserInputObjectSchema } from './CulinaryMenuItemUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CulinaryMenuItemWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CulinaryMenuItemUpdateWithoutUserInputObjectSchema), z.lazy(() => CulinaryMenuItemUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => CulinaryMenuItemCreateWithoutUserInputObjectSchema), z.lazy(() => CulinaryMenuItemUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const CulinaryMenuItemUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.CulinaryMenuItemUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryMenuItemUpsertWithWhereUniqueWithoutUserInput>;
export const CulinaryMenuItemUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
