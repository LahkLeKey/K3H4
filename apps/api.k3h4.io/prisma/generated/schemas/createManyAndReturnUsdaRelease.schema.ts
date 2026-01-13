import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaReleaseSelectObjectSchema as UsdaReleaseSelectObjectSchema } from './objects/UsdaReleaseSelect.schema';
import { UsdaReleaseCreateManyInputObjectSchema as UsdaReleaseCreateManyInputObjectSchema } from './objects/UsdaReleaseCreateManyInput.schema';

export const UsdaReleaseCreateManyAndReturnSchema: z.ZodType<Prisma.UsdaReleaseCreateManyAndReturnArgs> = z.object({ select: UsdaReleaseSelectObjectSchema.optional(), data: z.union([ UsdaReleaseCreateManyInputObjectSchema, z.array(UsdaReleaseCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.UsdaReleaseCreateManyAndReturnArgs>;

export const UsdaReleaseCreateManyAndReturnZodSchema = z.object({ select: UsdaReleaseSelectObjectSchema.optional(), data: z.union([ UsdaReleaseCreateManyInputObjectSchema, z.array(UsdaReleaseCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();