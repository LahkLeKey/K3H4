import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCacheEntrySelectObjectSchema as UsdaCacheEntrySelectObjectSchema } from './objects/UsdaCacheEntrySelect.schema';
import { UsdaCacheEntryWhereUniqueInputObjectSchema as UsdaCacheEntryWhereUniqueInputObjectSchema } from './objects/UsdaCacheEntryWhereUniqueInput.schema';

export const UsdaCacheEntryFindUniqueSchema: z.ZodType<Prisma.UsdaCacheEntryFindUniqueArgs> = z.object({ select: UsdaCacheEntrySelectObjectSchema.optional(),  where: UsdaCacheEntryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.UsdaCacheEntryFindUniqueArgs>;

export const UsdaCacheEntryFindUniqueZodSchema = z.object({ select: UsdaCacheEntrySelectObjectSchema.optional(),  where: UsdaCacheEntryWhereUniqueInputObjectSchema }).strict();