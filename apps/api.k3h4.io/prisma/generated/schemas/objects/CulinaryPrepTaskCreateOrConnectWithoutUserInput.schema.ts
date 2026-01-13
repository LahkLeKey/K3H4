import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CulinaryPrepTaskWhereUniqueInputObjectSchema as CulinaryPrepTaskWhereUniqueInputObjectSchema } from './CulinaryPrepTaskWhereUniqueInput.schema';
import { CulinaryPrepTaskCreateWithoutUserInputObjectSchema as CulinaryPrepTaskCreateWithoutUserInputObjectSchema } from './CulinaryPrepTaskCreateWithoutUserInput.schema';
import { CulinaryPrepTaskUncheckedCreateWithoutUserInputObjectSchema as CulinaryPrepTaskUncheckedCreateWithoutUserInputObjectSchema } from './CulinaryPrepTaskUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CulinaryPrepTaskWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CulinaryPrepTaskCreateWithoutUserInputObjectSchema), z.lazy(() => CulinaryPrepTaskUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const CulinaryPrepTaskCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.CulinaryPrepTaskCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryPrepTaskCreateOrConnectWithoutUserInput>;
export const CulinaryPrepTaskCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
