import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  set: z.instanceof(Uint8Array).optional()
}).strict();
export const NullableBytesFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.NullableBytesFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.NullableBytesFieldUpdateOperationsInput>;
export const NullableBytesFieldUpdateOperationsInputObjectZodSchema = makeSchema();
