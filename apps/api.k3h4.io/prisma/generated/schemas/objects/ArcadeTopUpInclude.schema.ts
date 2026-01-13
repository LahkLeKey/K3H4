import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { ArcadeCardArgsObjectSchema as ArcadeCardArgsObjectSchema } from './ArcadeCardArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  card: z.union([z.boolean(), z.lazy(() => ArcadeCardArgsObjectSchema)]).optional()
}).strict();
export const ArcadeTopUpIncludeObjectSchema: z.ZodType<Prisma.ArcadeTopUpInclude> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeTopUpInclude>;
export const ArcadeTopUpIncludeObjectZodSchema = makeSchema();
