import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeTopUpSelectObjectSchema as ArcadeTopUpSelectObjectSchema } from './objects/ArcadeTopUpSelect.schema';
import { ArcadeTopUpCreateManyInputObjectSchema as ArcadeTopUpCreateManyInputObjectSchema } from './objects/ArcadeTopUpCreateManyInput.schema';

export const ArcadeTopUpCreateManyAndReturnSchema: z.ZodType<Prisma.ArcadeTopUpCreateManyAndReturnArgs> = z.object({ select: ArcadeTopUpSelectObjectSchema.optional(), data: z.union([ ArcadeTopUpCreateManyInputObjectSchema, z.array(ArcadeTopUpCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ArcadeTopUpCreateManyAndReturnArgs>;

export const ArcadeTopUpCreateManyAndReturnZodSchema = z.object({ select: ArcadeTopUpSelectObjectSchema.optional(), data: z.union([ ArcadeTopUpCreateManyInputObjectSchema, z.array(ArcadeTopUpCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();