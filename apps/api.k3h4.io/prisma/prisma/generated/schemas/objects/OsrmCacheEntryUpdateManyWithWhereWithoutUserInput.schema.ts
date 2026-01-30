import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OsrmCacheEntryScalarWhereInputObjectSchema as OsrmCacheEntryScalarWhereInputObjectSchema } from './OsrmCacheEntryScalarWhereInput.schema';
import { OsrmCacheEntryUpdateManyMutationInputObjectSchema as OsrmCacheEntryUpdateManyMutationInputObjectSchema } from './OsrmCacheEntryUpdateManyMutationInput.schema';
import { OsrmCacheEntryUncheckedUpdateManyWithoutUserInputObjectSchema as OsrmCacheEntryUncheckedUpdateManyWithoutUserInputObjectSchema } from './OsrmCacheEntryUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OsrmCacheEntryScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => OsrmCacheEntryUpdateManyMutationInputObjectSchema), z.lazy(() => OsrmCacheEntryUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const OsrmCacheEntryUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.OsrmCacheEntryUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.OsrmCacheEntryUpdateManyWithWhereWithoutUserInput>;
export const OsrmCacheEntryUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
