import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CulinaryPrepTaskWhereUniqueInputObjectSchema as CulinaryPrepTaskWhereUniqueInputObjectSchema } from './CulinaryPrepTaskWhereUniqueInput.schema';
import { CulinaryPrepTaskUpdateWithoutUserInputObjectSchema as CulinaryPrepTaskUpdateWithoutUserInputObjectSchema } from './CulinaryPrepTaskUpdateWithoutUserInput.schema';
import { CulinaryPrepTaskUncheckedUpdateWithoutUserInputObjectSchema as CulinaryPrepTaskUncheckedUpdateWithoutUserInputObjectSchema } from './CulinaryPrepTaskUncheckedUpdateWithoutUserInput.schema';
import { CulinaryPrepTaskCreateWithoutUserInputObjectSchema as CulinaryPrepTaskCreateWithoutUserInputObjectSchema } from './CulinaryPrepTaskCreateWithoutUserInput.schema';
import { CulinaryPrepTaskUncheckedCreateWithoutUserInputObjectSchema as CulinaryPrepTaskUncheckedCreateWithoutUserInputObjectSchema } from './CulinaryPrepTaskUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CulinaryPrepTaskWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CulinaryPrepTaskUpdateWithoutUserInputObjectSchema), z.lazy(() => CulinaryPrepTaskUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => CulinaryPrepTaskCreateWithoutUserInputObjectSchema), z.lazy(() => CulinaryPrepTaskUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const CulinaryPrepTaskUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.CulinaryPrepTaskUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryPrepTaskUpsertWithWhereUniqueWithoutUserInput>;
export const CulinaryPrepTaskUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
