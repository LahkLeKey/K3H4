import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosLineItemCreateManyTicketInputObjectSchema as PosLineItemCreateManyTicketInputObjectSchema } from './PosLineItemCreateManyTicketInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => PosLineItemCreateManyTicketInputObjectSchema), z.lazy(() => PosLineItemCreateManyTicketInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const PosLineItemCreateManyTicketInputEnvelopeObjectSchema: z.ZodType<Prisma.PosLineItemCreateManyTicketInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.PosLineItemCreateManyTicketInputEnvelope>;
export const PosLineItemCreateManyTicketInputEnvelopeObjectZodSchema = makeSchema();
