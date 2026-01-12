import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeSessionSelectObjectSchema as ArcadeSessionSelectObjectSchema } from './objects/ArcadeSessionSelect.schema';
import { ArcadeSessionUpdateManyMutationInputObjectSchema as ArcadeSessionUpdateManyMutationInputObjectSchema } from './objects/ArcadeSessionUpdateManyMutationInput.schema';
import { ArcadeSessionWhereInputObjectSchema as ArcadeSessionWhereInputObjectSchema } from './objects/ArcadeSessionWhereInput.schema';

export const ArcadeSessionUpdateManyAndReturnSchema: z.ZodType<Prisma.ArcadeSessionUpdateManyAndReturnArgs> = z.object({ select: ArcadeSessionSelectObjectSchema.optional(), data: ArcadeSessionUpdateManyMutationInputObjectSchema, where: ArcadeSessionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ArcadeSessionUpdateManyAndReturnArgs>;

export const ArcadeSessionUpdateManyAndReturnZodSchema = z.object({ select: ArcadeSessionSelectObjectSchema.optional(), data: ArcadeSessionUpdateManyMutationInputObjectSchema, where: ArcadeSessionWhereInputObjectSchema.optional() }).strict();