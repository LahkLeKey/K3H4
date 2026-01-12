import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCacheEntrySelectObjectSchema as UsdaCacheEntrySelectObjectSchema } from './objects/UsdaCacheEntrySelect.schema';
import { UsdaCacheEntryWhereUniqueInputObjectSchema as UsdaCacheEntryWhereUniqueInputObjectSchema } from './objects/UsdaCacheEntryWhereUniqueInput.schema';

export const UsdaCacheEntryDeleteOneSchema: z.ZodType<Prisma.UsdaCacheEntryDeleteArgs> = z.object({ select: UsdaCacheEntrySelectObjectSchema.optional(),  where: UsdaCacheEntryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.UsdaCacheEntryDeleteArgs>;

export const UsdaCacheEntryDeleteOneZodSchema = z.object({ select: UsdaCacheEntrySelectObjectSchema.optional(),  where: UsdaCacheEntryWhereUniqueInputObjectSchema }).strict();