import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosTicketCreateManyStoreInputObjectSchema as PosTicketCreateManyStoreInputObjectSchema } from './PosTicketCreateManyStoreInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => PosTicketCreateManyStoreInputObjectSchema), z.lazy(() => PosTicketCreateManyStoreInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const PosTicketCreateManyStoreInputEnvelopeObjectSchema: z.ZodType<Prisma.PosTicketCreateManyStoreInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.PosTicketCreateManyStoreInputEnvelope>;
export const PosTicketCreateManyStoreInputEnvelopeObjectZodSchema = makeSchema();
