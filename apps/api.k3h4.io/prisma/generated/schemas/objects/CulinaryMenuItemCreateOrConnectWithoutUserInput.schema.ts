import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CulinaryMenuItemWhereUniqueInputObjectSchema as CulinaryMenuItemWhereUniqueInputObjectSchema } from './CulinaryMenuItemWhereUniqueInput.schema';
import { CulinaryMenuItemCreateWithoutUserInputObjectSchema as CulinaryMenuItemCreateWithoutUserInputObjectSchema } from './CulinaryMenuItemCreateWithoutUserInput.schema';
import { CulinaryMenuItemUncheckedCreateWithoutUserInputObjectSchema as CulinaryMenuItemUncheckedCreateWithoutUserInputObjectSchema } from './CulinaryMenuItemUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CulinaryMenuItemWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CulinaryMenuItemCreateWithoutUserInputObjectSchema), z.lazy(() => CulinaryMenuItemUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const CulinaryMenuItemCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.CulinaryMenuItemCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryMenuItemCreateOrConnectWithoutUserInput>;
export const CulinaryMenuItemCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
