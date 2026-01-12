import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeSessionWhereInputObjectSchema as ArcadeSessionWhereInputObjectSchema } from './objects/ArcadeSessionWhereInput.schema';

export const ArcadeSessionDeleteManySchema: z.ZodType<Prisma.ArcadeSessionDeleteManyArgs> = z.object({ where: ArcadeSessionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ArcadeSessionDeleteManyArgs>;

export const ArcadeSessionDeleteManyZodSchema = z.object({ where: ArcadeSessionWhereInputObjectSchema.optional() }).strict();