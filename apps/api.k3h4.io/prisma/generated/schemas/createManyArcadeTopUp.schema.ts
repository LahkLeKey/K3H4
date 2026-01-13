import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeTopUpCreateManyInputObjectSchema as ArcadeTopUpCreateManyInputObjectSchema } from './objects/ArcadeTopUpCreateManyInput.schema';

export const ArcadeTopUpCreateManySchema: z.ZodType<Prisma.ArcadeTopUpCreateManyArgs> = z.object({ data: z.union([ ArcadeTopUpCreateManyInputObjectSchema, z.array(ArcadeTopUpCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ArcadeTopUpCreateManyArgs>;

export const ArcadeTopUpCreateManyZodSchema = z.object({ data: z.union([ ArcadeTopUpCreateManyInputObjectSchema, z.array(ArcadeTopUpCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();