import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const nestedbytesnullablefilterSchema = z.object({
  equals: z.instanceof(Uint8Array).optional().nullable(),
  in: z.instanceof(Uint8Array).array().optional().nullable(),
  notIn: z.instanceof(Uint8Array).array().optional().nullable(),
  not: z.union([z.instanceof(Uint8Array), z.lazy(() => NestedBytesNullableFilterObjectSchema)]).optional().nullable()
}).strict();
export const NestedBytesNullableFilterObjectSchema: z.ZodType<Prisma.NestedBytesNullableFilter> = nestedbytesnullablefilterSchema as unknown as z.ZodType<Prisma.NestedBytesNullableFilter>;
export const NestedBytesNullableFilterObjectZodSchema = nestedbytesnullablefilterSchema;
