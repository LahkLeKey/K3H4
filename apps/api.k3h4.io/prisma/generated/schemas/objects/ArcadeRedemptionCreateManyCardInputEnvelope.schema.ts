import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeRedemptionCreateManyCardInputObjectSchema as ArcadeRedemptionCreateManyCardInputObjectSchema } from './ArcadeRedemptionCreateManyCardInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => ArcadeRedemptionCreateManyCardInputObjectSchema), z.lazy(() => ArcadeRedemptionCreateManyCardInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ArcadeRedemptionCreateManyCardInputEnvelopeObjectSchema: z.ZodType<Prisma.ArcadeRedemptionCreateManyCardInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionCreateManyCardInputEnvelope>;
export const ArcadeRedemptionCreateManyCardInputEnvelopeObjectZodSchema = makeSchema();
