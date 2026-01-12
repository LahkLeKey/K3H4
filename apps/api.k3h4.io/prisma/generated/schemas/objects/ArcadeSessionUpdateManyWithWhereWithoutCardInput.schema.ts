import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeSessionScalarWhereInputObjectSchema as ArcadeSessionScalarWhereInputObjectSchema } from './ArcadeSessionScalarWhereInput.schema';
import { ArcadeSessionUpdateManyMutationInputObjectSchema as ArcadeSessionUpdateManyMutationInputObjectSchema } from './ArcadeSessionUpdateManyMutationInput.schema';
import { ArcadeSessionUncheckedUpdateManyWithoutCardInputObjectSchema as ArcadeSessionUncheckedUpdateManyWithoutCardInputObjectSchema } from './ArcadeSessionUncheckedUpdateManyWithoutCardInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeSessionScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ArcadeSessionUpdateManyMutationInputObjectSchema), z.lazy(() => ArcadeSessionUncheckedUpdateManyWithoutCardInputObjectSchema)])
}).strict();
export const ArcadeSessionUpdateManyWithWhereWithoutCardInputObjectSchema: z.ZodType<Prisma.ArcadeSessionUpdateManyWithWhereWithoutCardInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionUpdateManyWithWhereWithoutCardInput>;
export const ArcadeSessionUpdateManyWithWhereWithoutCardInputObjectZodSchema = makeSchema();
