import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerCacheEntryScalarWhereInputObjectSchema as MaptilerCacheEntryScalarWhereInputObjectSchema } from './MaptilerCacheEntryScalarWhereInput.schema';
import { MaptilerCacheEntryUpdateManyMutationInputObjectSchema as MaptilerCacheEntryUpdateManyMutationInputObjectSchema } from './MaptilerCacheEntryUpdateManyMutationInput.schema';
import { MaptilerCacheEntryUncheckedUpdateManyWithoutUserInputObjectSchema as MaptilerCacheEntryUncheckedUpdateManyWithoutUserInputObjectSchema } from './MaptilerCacheEntryUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MaptilerCacheEntryScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => MaptilerCacheEntryUpdateManyMutationInputObjectSchema), z.lazy(() => MaptilerCacheEntryUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const MaptilerCacheEntryUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.MaptilerCacheEntryUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerCacheEntryUpdateManyWithWhereWithoutUserInput>;
export const MaptilerCacheEntryUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
