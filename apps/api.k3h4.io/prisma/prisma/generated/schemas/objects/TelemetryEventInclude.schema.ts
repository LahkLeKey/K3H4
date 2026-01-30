import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional()
}).strict();
export const TelemetryEventIncludeObjectSchema: z.ZodType<Prisma.TelemetryEventInclude> = makeSchema() as unknown as z.ZodType<Prisma.TelemetryEventInclude>;
export const TelemetryEventIncludeObjectZodSchema = makeSchema();
