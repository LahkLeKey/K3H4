import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosTicketCreateManyUserInputObjectSchema as PosTicketCreateManyUserInputObjectSchema } from './PosTicketCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => PosTicketCreateManyUserInputObjectSchema), z.lazy(() => PosTicketCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const PosTicketCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.PosTicketCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.PosTicketCreateManyUserInputEnvelope>;
export const PosTicketCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
