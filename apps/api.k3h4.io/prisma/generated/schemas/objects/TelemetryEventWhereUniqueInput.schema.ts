import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const TelemetryEventWhereUniqueInputObjectSchema: z.ZodType<Prisma.TelemetryEventWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.TelemetryEventWhereUniqueInput>;
export const TelemetryEventWhereUniqueInputObjectZodSchema = makeSchema();
