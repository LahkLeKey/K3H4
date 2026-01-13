import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeTopUpScalarWhereInputObjectSchema as ArcadeTopUpScalarWhereInputObjectSchema } from './ArcadeTopUpScalarWhereInput.schema';
import { ArcadeTopUpUpdateManyMutationInputObjectSchema as ArcadeTopUpUpdateManyMutationInputObjectSchema } from './ArcadeTopUpUpdateManyMutationInput.schema';
import { ArcadeTopUpUncheckedUpdateManyWithoutCardInputObjectSchema as ArcadeTopUpUncheckedUpdateManyWithoutCardInputObjectSchema } from './ArcadeTopUpUncheckedUpdateManyWithoutCardInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeTopUpScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ArcadeTopUpUpdateManyMutationInputObjectSchema), z.lazy(() => ArcadeTopUpUncheckedUpdateManyWithoutCardInputObjectSchema)])
}).strict();
export const ArcadeTopUpUpdateManyWithWhereWithoutCardInputObjectSchema: z.ZodType<Prisma.ArcadeTopUpUpdateManyWithWhereWithoutCardInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeTopUpUpdateManyWithWhereWithoutCardInput>;
export const ArcadeTopUpUpdateManyWithWhereWithoutCardInputObjectZodSchema = makeSchema();
