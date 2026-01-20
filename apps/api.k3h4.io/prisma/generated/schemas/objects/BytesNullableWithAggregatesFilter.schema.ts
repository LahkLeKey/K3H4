import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NestedBytesNullableWithAggregatesFilterObjectSchema as NestedBytesNullableWithAggregatesFilterObjectSchema } from './NestedBytesNullableWithAggregatesFilter.schema';
import { NestedIntNullableFilterObjectSchema as NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedBytesNullableFilterObjectSchema as NestedBytesNullableFilterObjectSchema } from './NestedBytesNullableFilter.schema'

const makeSchema = () => z.object({
  equals: z.instanceof(Uint8Array).optional().nullable(),
  in: z.instanceof(Uint8Array).array().optional().nullable(),
  notIn: z.instanceof(Uint8Array).array().optional().nullable(),
  not: z.union([z.instanceof(Uint8Array), z.lazy(() => NestedBytesNullableWithAggregatesFilterObjectSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedBytesNullableFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedBytesNullableFilterObjectSchema).optional()
}).strict();
export const BytesNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.BytesNullableWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.BytesNullableWithAggregatesFilter>;
export const BytesNullableWithAggregatesFilterObjectZodSchema = makeSchema();
