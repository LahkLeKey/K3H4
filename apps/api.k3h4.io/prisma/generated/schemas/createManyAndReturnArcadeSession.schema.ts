import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeSessionSelectObjectSchema as ArcadeSessionSelectObjectSchema } from './objects/ArcadeSessionSelect.schema';
import { ArcadeSessionCreateManyInputObjectSchema as ArcadeSessionCreateManyInputObjectSchema } from './objects/ArcadeSessionCreateManyInput.schema';

export const ArcadeSessionCreateManyAndReturnSchema: z.ZodType<Prisma.ArcadeSessionCreateManyAndReturnArgs> = z.object({ select: ArcadeSessionSelectObjectSchema.optional(), data: z.union([ ArcadeSessionCreateManyInputObjectSchema, z.array(ArcadeSessionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ArcadeSessionCreateManyAndReturnArgs>;

export const ArcadeSessionCreateManyAndReturnZodSchema = z.object({ select: ArcadeSessionSelectObjectSchema.optional(), data: z.union([ ArcadeSessionCreateManyInputObjectSchema, z.array(ArcadeSessionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();