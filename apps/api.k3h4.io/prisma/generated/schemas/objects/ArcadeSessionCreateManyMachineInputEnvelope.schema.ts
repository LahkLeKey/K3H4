import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeSessionCreateManyMachineInputObjectSchema as ArcadeSessionCreateManyMachineInputObjectSchema } from './ArcadeSessionCreateManyMachineInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => ArcadeSessionCreateManyMachineInputObjectSchema), z.lazy(() => ArcadeSessionCreateManyMachineInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ArcadeSessionCreateManyMachineInputEnvelopeObjectSchema: z.ZodType<Prisma.ArcadeSessionCreateManyMachineInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionCreateManyMachineInputEnvelope>;
export const ArcadeSessionCreateManyMachineInputEnvelopeObjectZodSchema = makeSchema();
