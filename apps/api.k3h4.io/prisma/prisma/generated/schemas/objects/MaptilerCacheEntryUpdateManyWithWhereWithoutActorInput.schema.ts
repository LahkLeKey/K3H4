import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerCacheEntryScalarWhereInputObjectSchema as MaptilerCacheEntryScalarWhereInputObjectSchema } from './MaptilerCacheEntryScalarWhereInput.schema';
import { MaptilerCacheEntryUpdateManyMutationInputObjectSchema as MaptilerCacheEntryUpdateManyMutationInputObjectSchema } from './MaptilerCacheEntryUpdateManyMutationInput.schema';
import { MaptilerCacheEntryUncheckedUpdateManyWithoutActorInputObjectSchema as MaptilerCacheEntryUncheckedUpdateManyWithoutActorInputObjectSchema } from './MaptilerCacheEntryUncheckedUpdateManyWithoutActorInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MaptilerCacheEntryScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => MaptilerCacheEntryUpdateManyMutationInputObjectSchema), z.lazy(() => MaptilerCacheEntryUncheckedUpdateManyWithoutActorInputObjectSchema)])
}).strict();
export const MaptilerCacheEntryUpdateManyWithWhereWithoutActorInputObjectSchema: z.ZodType<Prisma.MaptilerCacheEntryUpdateManyWithWhereWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerCacheEntryUpdateManyWithWhereWithoutActorInput>;
export const MaptilerCacheEntryUpdateManyWithWhereWithoutActorInputObjectZodSchema = makeSchema();
