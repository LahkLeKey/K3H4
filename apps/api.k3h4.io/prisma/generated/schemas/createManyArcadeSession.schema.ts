import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeSessionCreateManyInputObjectSchema as ArcadeSessionCreateManyInputObjectSchema } from './objects/ArcadeSessionCreateManyInput.schema';

export const ArcadeSessionCreateManySchema: z.ZodType<Prisma.ArcadeSessionCreateManyArgs> = z.object({ data: z.union([ ArcadeSessionCreateManyInputObjectSchema, z.array(ArcadeSessionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ArcadeSessionCreateManyArgs>;

export const ArcadeSessionCreateManyZodSchema = z.object({ data: z.union([ ArcadeSessionCreateManyInputObjectSchema, z.array(ArcadeSessionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();