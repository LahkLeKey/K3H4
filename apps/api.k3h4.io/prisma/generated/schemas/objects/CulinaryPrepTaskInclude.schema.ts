import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional()
}).strict();
export const CulinaryPrepTaskIncludeObjectSchema: z.ZodType<Prisma.CulinaryPrepTaskInclude> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryPrepTaskInclude>;
export const CulinaryPrepTaskIncludeObjectZodSchema = makeSchema();
