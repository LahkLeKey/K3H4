import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CulinaryMenuItemCreateManyUserInputObjectSchema as CulinaryMenuItemCreateManyUserInputObjectSchema } from './CulinaryMenuItemCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CulinaryMenuItemCreateManyUserInputObjectSchema), z.lazy(() => CulinaryMenuItemCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CulinaryMenuItemCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.CulinaryMenuItemCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryMenuItemCreateManyUserInputEnvelope>;
export const CulinaryMenuItemCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
