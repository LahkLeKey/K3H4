import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeTopUpWhereInputObjectSchema as ArcadeTopUpWhereInputObjectSchema } from './objects/ArcadeTopUpWhereInput.schema';

export const ArcadeTopUpDeleteManySchema: z.ZodType<Prisma.ArcadeTopUpDeleteManyArgs> = z.object({ where: ArcadeTopUpWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ArcadeTopUpDeleteManyArgs>;

export const ArcadeTopUpDeleteManyZodSchema = z.object({ where: ArcadeTopUpWhereInputObjectSchema.optional() }).strict();