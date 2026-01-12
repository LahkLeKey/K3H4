import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCacheEntrySelectObjectSchema as UsdaCacheEntrySelectObjectSchema } from './objects/UsdaCacheEntrySelect.schema';
import { UsdaCacheEntryCreateInputObjectSchema as UsdaCacheEntryCreateInputObjectSchema } from './objects/UsdaCacheEntryCreateInput.schema';
import { UsdaCacheEntryUncheckedCreateInputObjectSchema as UsdaCacheEntryUncheckedCreateInputObjectSchema } from './objects/UsdaCacheEntryUncheckedCreateInput.schema';

export const UsdaCacheEntryCreateOneSchema: z.ZodType<Prisma.UsdaCacheEntryCreateArgs> = z.object({ select: UsdaCacheEntrySelectObjectSchema.optional(),  data: z.union([UsdaCacheEntryCreateInputObjectSchema, UsdaCacheEntryUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.UsdaCacheEntryCreateArgs>;

export const UsdaCacheEntryCreateOneZodSchema = z.object({ select: UsdaCacheEntrySelectObjectSchema.optional(),  data: z.union([UsdaCacheEntryCreateInputObjectSchema, UsdaCacheEntryUncheckedCreateInputObjectSchema]) }).strict();