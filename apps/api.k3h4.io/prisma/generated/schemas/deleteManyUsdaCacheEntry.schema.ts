import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCacheEntryWhereInputObjectSchema as UsdaCacheEntryWhereInputObjectSchema } from './objects/UsdaCacheEntryWhereInput.schema';

export const UsdaCacheEntryDeleteManySchema: z.ZodType<Prisma.UsdaCacheEntryDeleteManyArgs> = z.object({ where: UsdaCacheEntryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.UsdaCacheEntryDeleteManyArgs>;

export const UsdaCacheEntryDeleteManyZodSchema = z.object({ where: UsdaCacheEntryWhereInputObjectSchema.optional() }).strict();