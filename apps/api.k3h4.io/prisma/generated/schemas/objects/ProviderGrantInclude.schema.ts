import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional()
}).strict();
export const ProviderGrantIncludeObjectSchema: z.ZodType<Prisma.ProviderGrantInclude> = makeSchema() as unknown as z.ZodType<Prisma.ProviderGrantInclude>;
export const ProviderGrantIncludeObjectZodSchema = makeSchema();
