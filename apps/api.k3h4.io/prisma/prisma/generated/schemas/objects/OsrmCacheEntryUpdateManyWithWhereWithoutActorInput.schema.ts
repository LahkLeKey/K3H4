import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OsrmCacheEntryScalarWhereInputObjectSchema as OsrmCacheEntryScalarWhereInputObjectSchema } from './OsrmCacheEntryScalarWhereInput.schema';
import { OsrmCacheEntryUpdateManyMutationInputObjectSchema as OsrmCacheEntryUpdateManyMutationInputObjectSchema } from './OsrmCacheEntryUpdateManyMutationInput.schema';
import { OsrmCacheEntryUncheckedUpdateManyWithoutActorInputObjectSchema as OsrmCacheEntryUncheckedUpdateManyWithoutActorInputObjectSchema } from './OsrmCacheEntryUncheckedUpdateManyWithoutActorInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OsrmCacheEntryScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => OsrmCacheEntryUpdateManyMutationInputObjectSchema), z.lazy(() => OsrmCacheEntryUncheckedUpdateManyWithoutActorInputObjectSchema)])
}).strict();
export const OsrmCacheEntryUpdateManyWithWhereWithoutActorInputObjectSchema: z.ZodType<Prisma.OsrmCacheEntryUpdateManyWithWhereWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.OsrmCacheEntryUpdateManyWithWhereWithoutActorInput>;
export const OsrmCacheEntryUpdateManyWithWhereWithoutActorInputObjectZodSchema = makeSchema();
