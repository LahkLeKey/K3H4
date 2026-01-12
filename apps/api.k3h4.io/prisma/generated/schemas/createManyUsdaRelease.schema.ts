import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaReleaseCreateManyInputObjectSchema as UsdaReleaseCreateManyInputObjectSchema } from './objects/UsdaReleaseCreateManyInput.schema';

export const UsdaReleaseCreateManySchema: z.ZodType<Prisma.UsdaReleaseCreateManyArgs> = z.object({ data: z.union([ UsdaReleaseCreateManyInputObjectSchema, z.array(UsdaReleaseCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.UsdaReleaseCreateManyArgs>;

export const UsdaReleaseCreateManyZodSchema = z.object({ data: z.union([ UsdaReleaseCreateManyInputObjectSchema, z.array(UsdaReleaseCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();