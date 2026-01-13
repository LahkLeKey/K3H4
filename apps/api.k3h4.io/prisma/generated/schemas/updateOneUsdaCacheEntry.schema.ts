import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCacheEntrySelectObjectSchema as UsdaCacheEntrySelectObjectSchema } from './objects/UsdaCacheEntrySelect.schema';
import { UsdaCacheEntryUpdateInputObjectSchema as UsdaCacheEntryUpdateInputObjectSchema } from './objects/UsdaCacheEntryUpdateInput.schema';
import { UsdaCacheEntryUncheckedUpdateInputObjectSchema as UsdaCacheEntryUncheckedUpdateInputObjectSchema } from './objects/UsdaCacheEntryUncheckedUpdateInput.schema';
import { UsdaCacheEntryWhereUniqueInputObjectSchema as UsdaCacheEntryWhereUniqueInputObjectSchema } from './objects/UsdaCacheEntryWhereUniqueInput.schema';

export const UsdaCacheEntryUpdateOneSchema: z.ZodType<Prisma.UsdaCacheEntryUpdateArgs> = z.object({ select: UsdaCacheEntrySelectObjectSchema.optional(),  data: z.union([UsdaCacheEntryUpdateInputObjectSchema, UsdaCacheEntryUncheckedUpdateInputObjectSchema]), where: UsdaCacheEntryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.UsdaCacheEntryUpdateArgs>;

export const UsdaCacheEntryUpdateOneZodSchema = z.object({ select: UsdaCacheEntrySelectObjectSchema.optional(),  data: z.union([UsdaCacheEntryUpdateInputObjectSchema, UsdaCacheEntryUncheckedUpdateInputObjectSchema]), where: UsdaCacheEntryWhereUniqueInputObjectSchema }).strict();