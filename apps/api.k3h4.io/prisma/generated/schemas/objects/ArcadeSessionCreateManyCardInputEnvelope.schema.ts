import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeSessionCreateManyCardInputObjectSchema as ArcadeSessionCreateManyCardInputObjectSchema } from './ArcadeSessionCreateManyCardInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => ArcadeSessionCreateManyCardInputObjectSchema), z.lazy(() => ArcadeSessionCreateManyCardInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ArcadeSessionCreateManyCardInputEnvelopeObjectSchema: z.ZodType<Prisma.ArcadeSessionCreateManyCardInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionCreateManyCardInputEnvelope>;
export const ArcadeSessionCreateManyCardInputEnvelopeObjectZodSchema = makeSchema();
