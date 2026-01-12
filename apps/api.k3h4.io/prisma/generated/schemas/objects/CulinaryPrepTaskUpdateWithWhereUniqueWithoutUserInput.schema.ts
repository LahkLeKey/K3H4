import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CulinaryPrepTaskWhereUniqueInputObjectSchema as CulinaryPrepTaskWhereUniqueInputObjectSchema } from './CulinaryPrepTaskWhereUniqueInput.schema';
import { CulinaryPrepTaskUpdateWithoutUserInputObjectSchema as CulinaryPrepTaskUpdateWithoutUserInputObjectSchema } from './CulinaryPrepTaskUpdateWithoutUserInput.schema';
import { CulinaryPrepTaskUncheckedUpdateWithoutUserInputObjectSchema as CulinaryPrepTaskUncheckedUpdateWithoutUserInputObjectSchema } from './CulinaryPrepTaskUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CulinaryPrepTaskWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CulinaryPrepTaskUpdateWithoutUserInputObjectSchema), z.lazy(() => CulinaryPrepTaskUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const CulinaryPrepTaskUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.CulinaryPrepTaskUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryPrepTaskUpdateWithWhereUniqueWithoutUserInput>;
export const CulinaryPrepTaskUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
