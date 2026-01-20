import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NestedBytesNullableFilterObjectSchema as NestedBytesNullableFilterObjectSchema } from './NestedBytesNullableFilter.schema'

const makeSchema = () => z.object({
  equals: z.instanceof(Uint8Array).optional().nullable(),
  in: z.instanceof(Uint8Array).array().optional().nullable(),
  notIn: z.instanceof(Uint8Array).array().optional().nullable(),
  not: z.union([z.instanceof(Uint8Array), z.lazy(() => NestedBytesNullableFilterObjectSchema)]).optional().nullable()
}).strict();
export const BytesNullableFilterObjectSchema: z.ZodType<Prisma.BytesNullableFilter> = makeSchema() as unknown as z.ZodType<Prisma.BytesNullableFilter>;
export const BytesNullableFilterObjectZodSchema = makeSchema();
