import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeSessionCreateManyRewardRedemptionInputObjectSchema as ArcadeSessionCreateManyRewardRedemptionInputObjectSchema } from './ArcadeSessionCreateManyRewardRedemptionInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => ArcadeSessionCreateManyRewardRedemptionInputObjectSchema), z.lazy(() => ArcadeSessionCreateManyRewardRedemptionInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ArcadeSessionCreateManyRewardRedemptionInputEnvelopeObjectSchema: z.ZodType<Prisma.ArcadeSessionCreateManyRewardRedemptionInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionCreateManyRewardRedemptionInputEnvelope>;
export const ArcadeSessionCreateManyRewardRedemptionInputEnvelopeObjectZodSchema = makeSchema();
