import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerCacheEntryScalarWhereInputObjectSchema as MaptilerCacheEntryScalarWhereInputObjectSchema } from './MaptilerCacheEntryScalarWhereInput.schema';
import { MaptilerCacheEntryUpdateManyMutationInputObjectSchema as MaptilerCacheEntryUpdateManyMutationInputObjectSchema } from './MaptilerCacheEntryUpdateManyMutationInput.schema';
import { MaptilerCacheEntryUncheckedUpdateManyWithoutQueryInputObjectSchema as MaptilerCacheEntryUncheckedUpdateManyWithoutQueryInputObjectSchema } from './MaptilerCacheEntryUncheckedUpdateManyWithoutQueryInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MaptilerCacheEntryScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => MaptilerCacheEntryUpdateManyMutationInputObjectSchema), z.lazy(() => MaptilerCacheEntryUncheckedUpdateManyWithoutQueryInputObjectSchema)])
}).strict();
export const MaptilerCacheEntryUpdateManyWithWhereWithoutQueryInputObjectSchema: z.ZodType<Prisma.MaptilerCacheEntryUpdateManyWithWhereWithoutQueryInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerCacheEntryUpdateManyWithWhereWithoutQueryInput>;
export const MaptilerCacheEntryUpdateManyWithWhereWithoutQueryInputObjectZodSchema = makeSchema();
