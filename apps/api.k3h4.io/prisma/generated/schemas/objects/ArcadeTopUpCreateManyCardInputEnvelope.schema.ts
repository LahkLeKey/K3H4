import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeTopUpCreateManyCardInputObjectSchema as ArcadeTopUpCreateManyCardInputObjectSchema } from './ArcadeTopUpCreateManyCardInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => ArcadeTopUpCreateManyCardInputObjectSchema), z.lazy(() => ArcadeTopUpCreateManyCardInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ArcadeTopUpCreateManyCardInputEnvelopeObjectSchema: z.ZodType<Prisma.ArcadeTopUpCreateManyCardInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeTopUpCreateManyCardInputEnvelope>;
export const ArcadeTopUpCreateManyCardInputEnvelopeObjectZodSchema = makeSchema();
