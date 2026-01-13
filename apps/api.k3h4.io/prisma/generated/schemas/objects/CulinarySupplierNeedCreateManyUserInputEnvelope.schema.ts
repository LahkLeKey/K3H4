import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CulinarySupplierNeedCreateManyUserInputObjectSchema as CulinarySupplierNeedCreateManyUserInputObjectSchema } from './CulinarySupplierNeedCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CulinarySupplierNeedCreateManyUserInputObjectSchema), z.lazy(() => CulinarySupplierNeedCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CulinarySupplierNeedCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.CulinarySupplierNeedCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CulinarySupplierNeedCreateManyUserInputEnvelope>;
export const CulinarySupplierNeedCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
